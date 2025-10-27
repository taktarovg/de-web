import { NextResponse } from 'next/server'
import { prisma } from '@designemotion/database'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { broadcastId } = body

    if (!broadcastId) {
      return NextResponse.json(
        { error: 'Broadcast ID is required' },
        { status: 400 }
      )
    }

    // Получаем рассылку
    const broadcast = await prisma.broadcast.findUnique({
      where: { id: broadcastId },
    })

    if (!broadcast) {
      return NextResponse.json(
        { error: 'Broadcast not found' },
        { status: 404 }
      )
    }

    if (broadcast.status !== 'draft') {
      return NextResponse.json(
        { error: 'Can only send draft broadcasts' },
        { status: 400 }
      )
    }

    // Получаем всех активных пользователей
    const users = await prisma.user.findMany({
      select: {
        id: true,
        telegramId: true,
      },
    })

    // Обновляем статус рассылки
    await prisma.broadcast.update({
      where: { id: broadcastId },
      data: {
        status: 'sending',
        startedAt: new Date(),
        totalUsers: users.length,
      },
    })

    // Создаём записи для отслеживания доставки
    await prisma.broadcastDelivery.createMany({
      data: users.map(user => ({
        broadcastId,
        userId: user.id,
        delivered: false,
      })),
      skipDuplicates: true,
    })

    // Отправляем запрос на бот для начала рассылки
    // Бот будет постепенно отправлять сообщения и обновлять статусы
    const botWebhookUrl = process.env.BOT_WEBHOOK_URL || 'http://localhost:3002'
    
    try {
      await fetch(`${botWebhookUrl}/api/broadcast/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          broadcastId,
          users: users.map(u => ({
            id: u.id,
            telegramId: u.telegramId.toString(),
          })),
          broadcast: {
            message: broadcast.message,
            imageUrl: broadcast.imageUrl,
            buttonText: broadcast.buttonText,
            buttonUrl: broadcast.buttonUrl,
          },
        }),
      })
    } catch (error) {
      console.error('Failed to notify bot:', error)
      // Не возвращаем ошибку, так как рассылка уже создана в БД
    }

    return NextResponse.json({ success: true, totalUsers: users.length })
  } catch (error) {
    console.error('Error sending broadcast:', error)
    return NextResponse.json(
      { error: 'Failed to send broadcast' },
      { status: 500 }
    )
  }
}
