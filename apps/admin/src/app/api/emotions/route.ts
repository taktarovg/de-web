import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@designemotion/database'

// GET /api/emotions - Получить все эмоции
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const isActive = searchParams.get('isActive')

    const where: any = {}
    
    if (category) {
      where.category = category.toLowerCase()
    }
    
    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    const emotions = await prisma.emotion.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { sortOrder: 'asc' },
        { level: 'asc' },
      ],
      include: {
        _count: {
          select: { analyses: true },
        },
      },
    })

    return NextResponse.json({ success: true, data: emotions })
  } catch (error) {
    console.error('Error fetching emotions:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка при получении эмоций' },
      { status: 500 }
    )
  }
}

// POST /api/emotions - Создать новую эмоцию
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, emoji, category, level, description, isActive, sortOrder } = body

    // Validate required fields
    if (!name || !emoji || !category || level === undefined) {
      return NextResponse.json(
        { success: false, error: 'Отсутствуют обязательные поля (name, emoji, category, level)' },
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

    // Check for duplicate name
    const existingEmotion = await prisma.emotion.findFirst({
      where: {
        name: name.trim(),
        category: category.toLowerCase().trim(),
      },
    })

    if (existingEmotion) {
      return NextResponse.json(
        { success: false, error: `Эмоция "${name}" уже существует в категории "${category}"` },
        { status: 400 }
      )
    }

    // Get next sort order if not provided
    let finalSortOrder = sortOrder
    if (finalSortOrder === undefined) {
      const lastEmotion = await prisma.emotion.findFirst({
        where: { category: category.toLowerCase().trim() },
        orderBy: { sortOrder: 'desc' },
      })
      finalSortOrder = lastEmotion ? lastEmotion.sortOrder + 1 : 0
    }

    // Create emotion
    const newEmotion = await prisma.emotion.create({
      data: {
        name: name.trim(),
        emoji: emoji.trim(),
        category: category.toLowerCase().trim(),
        level: parseInt(level),
        description: description?.trim() || null,
        isActive: isActive !== false, // Default true
        sortOrder: parseInt(finalSortOrder),
      },
      include: {
        _count: {
          select: { analyses: true },
        },
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        data: newEmotion,
        message: 'Эмоция успешно создана'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating emotion:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка при создании эмоции' },
      { status: 500 }
    )
  }
}
