import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@designemotion/database'

// Telegram Bot API URL
const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

// POST - Отправка сообщения пользователю через Telegram Bot API с сохранением в БД
export async function POST(request: NextRequest) {
  let bodyData: any = null
  
  try {
    // Читаем body ОДИН раз и сохраняем
    bodyData = await request.json()
    const { telegramId, message, adminId = 'admin', template = null } = bodyData

    // Валидация
    if (!telegramId || !message) {
      return NextResponse.json(
        { success: false, error: 'telegramId и message обязательны' },
        { status: 400 }
      )
    }

    if (!TELEGRAM_BOT_TOKEN) {
      console.error('❌ BOT_TOKEN не найден в переменных окружения')
      return NextResponse.json(
        { success: false, error: 'Telegram Bot не настроен' },
        { status: 500 }
      )
    }

    console.log(`📤 Отправка сообщения пользователю ${telegramId}`)

    // 1. Найти пользователя в БД по telegramId
    const user = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) }
    })

    if (!user) {
      console.error(`❌ Пользователь с telegramId ${telegramId} не найден в БД`)
      return NextResponse.json(
        { success: false, error: 'Пользователь не найден' },
        { status: 404 }
      )
    }

    // 2. Отправляем сообщение через Telegram Bot API
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramId,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    const result = await response.json()

    // 3. Сохраняем в БД (независимо от успеха отправки)
    const messageStatus = result.ok ? 'sent' : 'failed'
    const errorMessage = result.ok ? null : result.description || 'Unknown error'

    const adminMessage = await prisma.adminMessage.create({
      data: {
        userId: user.id,
        adminId: adminId,
        message: message,
        status: messageStatus,
        sentAt: new Date(),
        errorMessage: errorMessage,
        ...(template && { metadata: { template } }), // Условно добавляем metadata только если есть template
      },
      include: {
        user: {
          select: {
            telegramId: true,
            firstName: true,
            username: true,
          }
        }
      }
    })

    if (!result.ok) {
      console.error('❌ Ошибка отправки сообщения:', result)
      return NextResponse.json(
        { 
          success: false, 
          error: result.description || 'Не удалось отправить сообщение',
          savedToDb: true,
          messageId: adminMessage.id
        },
        { status: 500 }
      )
    }

    console.log(`✅ Сообщение успешно отправлено пользователю ${telegramId} и сохранено в БД`)

    return NextResponse.json({
      success: true,
      message: 'Сообщение успешно отправлено и сохранено',
      data: {
        telegramMessageId: result.result.message_id,
        dbMessageId: adminMessage.id,
        sentAt: adminMessage.sentAt,
        user: {
          telegramId: user.telegramId.toString(),
          firstName: user.firstName,
          username: user.username,
        }
      }
    })

  } catch (error: any) {
    console.error('❌ Ошибка в send-message API:', error)
    
    // Попытка сохранить неудачную попытку в БД (используем сохранённый bodyData)
    try {
      if (bodyData && bodyData.telegramId) {
        const { telegramId, message, adminId = 'admin' } = bodyData
        
        const user = await prisma.user.findUnique({
          where: { telegramId: BigInt(telegramId) }
        })
        
        if (user) {
          await prisma.adminMessage.create({
            data: {
              userId: user.id,
              adminId: adminId,
              message: message || 'Error: message not captured',
              status: 'failed',
              errorMessage: error.message,
            }
          })
        }
      }
    } catch (dbError) {
      console.error('❌ Не удалось сохранить ошибку в БД:', dbError)
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Внутренняя ошибка сервера'
      },
      { status: 500 }
    )
  }
}

// GET - Получение истории сообщений для пользователя
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const telegramId = searchParams.get('telegramId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!telegramId) {
      return NextResponse.json(
        { success: false, error: 'telegramId обязателен' },
        { status: 400 }
      )
    }

    // Найти пользователя
    const user = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Пользователь не найден' },
        { status: 404 }
      )
    }

    // Получить историю сообщений
    const messages = await prisma.adminMessage.findMany({
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
        adminId: true,
        errorMessage: true,
        metadata: true,
      }
    })

    // Подсчет общего количества
    const total = await prisma.adminMessage.count({
      where: { userId: user.id }
    })

    return NextResponse.json({
      success: true,
      data: {
        messages,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      }
    })

  } catch (error: any) {
    console.error('❌ Ошибка при получении истории:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
