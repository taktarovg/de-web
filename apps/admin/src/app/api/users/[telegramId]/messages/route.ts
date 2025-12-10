import { NextResponse } from 'next/server'
import { prisma } from '@ecosystem/database'

export async function GET(
  request: Request,
  { params }: { params: { telegramId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Validate limit and offset
    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 50' },
        { status: 400 }
      )
    }

    if (offset < 0) {
      return NextResponse.json(
        { error: 'Offset must be non-negative' },
        { status: 400 }
      )
    }

    // Получаем user_id по telegram_id
    const user = await prisma.user.findUnique({
      where: { telegramId: BigInt(params.telegramId) },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found'
        },
        { status: 404 }
      )
    }

    // Получаем сообщения с пагинацией
    const [messages, totalCount] = await Promise.all([
      prisma.adminMessage.findMany({
        where: { userId: user.id },
        orderBy: { sentAt: 'desc' },
        take: limit,
        skip: offset,
        select: {
          id: true,
          message: true,
          status: true,
          sentAt: true,
          readAt: true,
          errorMessage: true,
          adminId: true,
          metadata: true,
        }
      }),
      prisma.adminMessage.count({
        where: { userId: user.id }
      })
    ])

    // Подсчет статистики
    const statusCounts = await prisma.adminMessage.groupBy({
      by: ['status'],
      where: { userId: user.id },
      _count: { id: true }
    })

    const stats = {
      total: totalCount,
      sent: statusCounts.find(s => s.status === 'sent')?._count.id || 0,
      pending: statusCounts.find(s => s.status === 'pending')?._count.id || 0,
      failed: statusCounts.find(s => s.status === 'failed')?._count.id || 0,
    }

    return NextResponse.json({
      success: true,
      data: {
        messages,
        stats,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount
        }
      }
    })
  } catch (error) {
    console.error('Error fetching admin messages:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch messages'
      },
      { status: 500 }
    )
  }
}
