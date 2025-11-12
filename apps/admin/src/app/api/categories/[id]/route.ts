import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@designemotion/database'

// GET /api/categories/:id - Получить категорию
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.emotionCategory.findUnique({
      where: { id: params.id },
    })

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Категория не найдена' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: category })
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка при получении категории' },
      { status: 500 }
    )
  }
}

// PUT /api/categories/:id - Обновить категорию
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, levelMin, levelMax, emoji, description, colorHex, sortOrder } = body

    // Check if category exists
    const existingCategory = await prisma.emotionCategory.findUnique({
      where: { id: params.id },
    })

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Категория не найдена' },
        { status: 404 }
      )
    }

    // Validate level range if provided
    if (levelMin !== undefined && levelMax !== undefined) {
      if (levelMin < 20 || levelMax > 1000 || levelMin >= levelMax) {
        return NextResponse.json(
          { success: false, error: 'Некорректный диапазон уровней (20-1000, min < max)' },
          { status: 400 }
        )
      }
    }

    // Check for duplicate name (excluding current category)
    if (name && name !== existingCategory.name) {
      const duplicateName = await prisma.emotionCategory.findFirst({
        where: {
          name: name.toLowerCase().trim(),
          NOT: { id: params.id },
        },
      })

      if (duplicateName) {
        return NextResponse.json(
          { success: false, error: `Категория "${name}" уже существует` },
          { status: 400 }
        )
      }
    }

    // Prepare update data
    const updateData: any = {}
    if (name !== undefined) updateData.name = name.toLowerCase().trim()
    if (levelMin !== undefined) updateData.levelMin = parseInt(levelMin)
    if (levelMax !== undefined) updateData.levelMax = parseInt(levelMax)
    if (emoji !== undefined) updateData.emoji = emoji.trim()
    if (description !== undefined) updateData.description = description?.trim() || null
    if (colorHex !== undefined) updateData.colorHex = colorHex?.trim() || null
    if (sortOrder !== undefined) updateData.sortOrder = parseInt(sortOrder)

    // Update category
    const updatedCategory = await prisma.emotionCategory.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json({ 
      success: true, 
      data: updatedCategory,
      message: 'Категория успешно обновлена'
    })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка при обновлении категории' },
      { status: 500 }
    )
  }
}

// DELETE /api/categories/:id - Удалить категорию
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if category exists
    const category = await prisma.emotionCategory.findUnique({
      where: { id: params.id },
    })

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Категория не найдена' },
        { status: 404 }
      )
    }

    // Check if category has emotions
    const emotionsCount = await prisma.emotion.count({
      where: { category: category.name },
    })

    if (emotionsCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Невозможно удалить категорию. В ней ${emotionsCount} эмоций.`,
          emotionsCount,
        },
        { status: 400 }
      )
    }

    // Delete category
    await prisma.emotionCategory.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Категория успешно удалена',
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка при удалении категории' },
      { status: 500 }
    )
  }
}
