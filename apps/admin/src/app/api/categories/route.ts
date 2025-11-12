import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@designemotion/database'

// GET /api/categories - Получить все категории
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.emotionCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка при получении категорий' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Создать новую категорию
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, levelMin, levelMax, emoji, description, colorHex, sortOrder } = body

    // Validate required fields
    if (!name || levelMin === undefined || levelMax === undefined || !emoji) {
      return NextResponse.json(
        { success: false, error: 'Отсутствуют обязательные поля (name, levelMin, levelMax, emoji)' },
        { status: 400 }
      )
    }

    // Validate level range
    if (levelMin < 20 || levelMax > 1000 || levelMin >= levelMax) {
      return NextResponse.json(
        { success: false, error: 'Некорректный диапазон уровней (20-1000, min < max)' },
        { status: 400 }
      )
    }

    // Check for duplicate name
    const existingCategory = await prisma.emotionCategory.findFirst({
      where: { name: name.toLowerCase().trim() },
    })

    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: `Категория "${name}" уже существует` },
        { status: 400 }
      )
    }

    // Get next sort order if not provided
    let finalSortOrder = sortOrder
    if (finalSortOrder === undefined) {
      const lastCategory = await prisma.emotionCategory.findFirst({
        orderBy: { sortOrder: 'desc' },
      })
      finalSortOrder = lastCategory?.sortOrder ? lastCategory.sortOrder + 1 : 0
    }

    // Create category
    const newCategory = await prisma.emotionCategory.create({
      data: {
        name: name.toLowerCase().trim(),
        levelMin: parseInt(levelMin),
        levelMax: parseInt(levelMax),
        emoji: emoji.trim(),
        description: description?.trim() || null,
        colorHex: colorHex?.trim() || '#000000',
        sortOrder: parseInt(finalSortOrder),
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        data: newCategory,
        message: 'Категория успешно создана'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка при создании категории' },
      { status: 500 }
    )
  }
}
