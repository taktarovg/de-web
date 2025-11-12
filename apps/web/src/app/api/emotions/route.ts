import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@designemotion/database';

/**
 * GET /api/emotions - Получить все эмоции
 */
export async function GET(request: NextRequest) {
  try {
    const emotions = await prisma.emotion.findMany({
      orderBy: [
        { category: 'asc' },
        { sortOrder: 'asc' }
      ],
      include: {
        _count: {
          select: { analyses: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: emotions
    });
  } catch (error) {
    console.error('GET /api/emotions error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch emotions' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/emotions - Создать новую эмоцию
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, emoji, category, level, description, isActive, sortOrder } = body;

    // Валидация обязательных полей
    if (!name || !emoji || !category || level === undefined) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: name, emoji, category, level' 
        },
        { status: 400 }
      );
    }

    // Проверка, что level в допустимом диапазоне (20-1000)
    if (level < 20 || level > 1000) {
      return NextResponse.json(
        { success: false, error: 'Level must be between 20 and 1000' },
        { status: 400 }
      );
    }

    // Создание эмоции
    const emotion = await prisma.emotion.create({
      data: {
        name: name.trim(),
        emoji,
        category,
        level,
        description: description?.trim() || null,
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0,
      },
      include: {
        _count: {
          select: { analyses: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: emotion
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/emotions error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create emotion' },
      { status: 500 }
    );
  }
}
