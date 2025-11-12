import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@designemotion/database'

// GET /api/emotions/:id - Получить эмоцию
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const emotion = await prisma.emotion.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { analyses: true },
        },
      },
    })

    if (!emotion) {
      return NextResponse.json(
        { success: false, error: 'Эмоция не найдена' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: emotion })
  } catch (error) {
    console.error('Error fetching emotion:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка при получении эмоции' },
      { status: 500 }
    )
  }
}

// PUT /api/emotions/:id - Обновить эмоцию
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, emoji, category, level, description, isActive, sortOrder } = body

    // Validate required fields
    if (!name || !emoji || !category || level === undefined) {
      return NextResponse.json(
        { success: false, error: 'Отсутствуют обязательные поля' },
        { status: 400 }
      )
    }

    // Validate level range (20-1000 по шкале Хокинса)
    if (level < 20 || level > 1000) {
      return NextResponse.json(
        { success: false, error: 'Уровень должен быть от 20 до 1000' },
        { status: 400 }
      )
    }

    // Check if emotion exists
    const existingEmotion = await prisma.emotion.findUnique({
      where: { id: params.id },
    })

    if (!existingEmotion) {
      return NextResponse.json(
        { success: false, error: 'Эмоция не найдена' },
        { status: 404 }
      )
    }

    // Update emotion
    const updatedEmotion = await prisma.emotion.update({
      where: { id: params.id },
      data: {
        name: name.trim(),
        emoji: emoji.trim(),
        category: category.toLowerCase().trim(),
        level: parseInt(level),
        description: description?.trim() || null,
        isActive: isActive === true,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : existingEmotion.sortOrder,
      },
      include: {
        _count: {
          select: { analyses: true },
        },
      },
    })

    return NextResponse.json({ 
      success: true, 
      data: updatedEmotion,
      message: 'Эмоция успешно обновлена'
    })
  } catch (error) {
    console.error('Error updating emotion:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка при обновлении эмоции' },
      { status: 500 }
    )
  }
}

// DELETE /api/emotions/:id - Удалить эмоцию
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if emotion exists
    const emotion = await prisma.emotion.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { analyses: true },
        },
      },
    })

    if (!emotion) {
      return NextResponse.json(
        { success: false, error: 'Эмоция не найдена' },
        { status: 404 }
      )
    }

    // Check if emotion is used in analyses
    if (emotion._count.analyses > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Невозможно удалить эмоцию. Она используется в ${emotion._count.analyses} анализах.`,
          usageCount: emotion._count.analyses,
        },
        { status: 400 }
      )
    }

    // Delete emotion
    await prisma.emotion.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Эмоция успешно удалена',
    })
  } catch (error) {
    console.error('Error deleting emotion:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка при удалении эмоции' },
      { status: 500 }
    )
  }
}
