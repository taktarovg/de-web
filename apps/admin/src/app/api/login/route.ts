import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_EMAIL = 'admin@designemotion.ru'
const ADMIN_PASSWORD = '13Vbkkbjyjd'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Простая проверка (в production использовать bcrypt и БД)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Создать токен (base64 для простоты, в production использовать JWT)
      const token = btoa(`${email}:${password}`)

      // Установить cookie
      cookies().set('admin_auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 дней
        path: '/',
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}
