import { NextRequest, NextResponse } from 'next/server'

// Telegram Bot API URL
const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

// Отправка сообщения пользователю через Telegram Bot API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { telegramId, message } = body

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

    // Отправляем сообщение через Telegram Bot API
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramId,
        text: message,
        parse_mode: 'Markdown', // Поддержка форматирования
      }),
    })

    const result = await response.json()

    if (!result.ok) {
      console.error('❌ Ошибка отправки сообщения:', result)
      return NextResponse.json(
        { 
          success: false, 
          error: result.description || 'Не удалось отправить сообщение'
        },
        { status: 500 }
      )
    }

    console.log(`✅ Сообщение успешно отправлено пользователю ${telegramId}`)

    return NextResponse.json({
      success: true,
      message: 'Сообщение успешно отправлено',
      data: result.result
    })

  } catch (error: any) {
    console.error('❌ Ошибка в send-message API:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Внутренняя ошибка сервера'
      },
      { status: 500 }
    )
  }
}
