import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@designemotion/database';

/**
 * GET /api/emotions/[id] - Получить эмоцию по ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const emotion = await prisma.emotion.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { analyses: true }
        }
      }
    });

    if (!emotion) {
      return NextResponse.json(
        { success: false, error: 'Emotion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: emotion
    });
  } catch (error) {
    console.error(`GET /api/emotions/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch emotion' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/emotions/[id] - Обновить эмоцию
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, emoji, category, level, description, isActive, sortOrder } = body;

    // Проверка существования эмоции
    const existingEmotion = await prisma.emotion.findUnique({
      where: { id: params.id }
    });

    if (!existingEmotion) {
      return NextResponse.json(
        { success: false, error: 'Emotion not found' },
        { status: 404 }
      );
    }

    // Валидация level если он изменяется
    if (level !== undefined && (level < 20 || level > 1000)) {
      return NextResponse.json(
        { success: false, error: 'Level must be between 20 and 1000' },
        { status: 400 }
      );
    }

    // Подготовка данных для обновления (обновляем только переданные поля)
    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (emoji !== undefined) updateData.emoji = emoji;
    if (category !== undefined) updateData.category = category;
    if (level !== undefined) updateData.level = level;
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

    // Обновление эмоции
    const emotion = await prisma.emotion.update({
      where: { id: params.id },
      data: updateData,
      include: {
        _count: {
          select: { analyses: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: emotion
    });
  } catch (error) {
    console.error(`PUT /api/emotions/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to update emotion' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/emotions/[id] - Удалить эмоцию
 * Примечание: Эмоция не удаляется физически, если есть связанные анализы.
 * Вместо этого она деактивируется (isActive = false).
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Проверка существования эмоции
    const emotion = await prisma.emotion.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { analyses: true }
        }
      }
    });

    if (!emotion) {
      return NextResponse.json(
        { success: false, error: 'Emotion not found' },
        { status: 404 }
      );
    }

    // Если есть связанные анализы - деактивируем вместо удаления
    if (emotion._count.analyses > 0) {
      const updated = await prisma.emotion.update({
        where: { id: params.id },
        data: { isActive: false }
      });

      return NextResponse.json({
        success: true,
        data: updated,
        message: `Emotion deactivated because it has ${emotion._count.analyses} associated analyses`
      });
    }

    // Если анализов нет - можно удалить физически
    await prisma.emotion.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Emotion deleted successfully'
    });
  } catch (error) {
    console.error(`DELETE /api/emotions/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete emotion' },
      { status: 500 }
    );
  }
}
