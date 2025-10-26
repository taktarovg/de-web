import { NextResponse } from 'next/server'
import { prisma } from '@designemotion/database'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, message, imageUrl, buttonText, buttonUrl } = body

    if (!title || !message) {
      return NextResponse.json(
        { error: 'Title and message are required' },
        { status: 400 }
      )
    }

    // Создаём черновик рассылки
    const broadcast = await prisma.broadcast.create({
      data: {
        title,
        message,
        imageUrl,
        buttonText,
        buttonUrl,
        status: 'draft',
        createdBy: 'admin', // В будущем можно добавить аутентификацию
      },
    })

    return NextResponse.json(broadcast, { status: 201 })
  } catch (error) {
    console.error('Error creating broadcast:', error)
    return NextResponse.json(
      { error: 'Failed to create broadcast' },
      { status: 500 }
    )
  }
}
