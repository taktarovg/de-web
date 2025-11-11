import { NextResponse } from 'next/server';

export async function GET() {
  // Читаем переменные окружения на сервере
  const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || '';
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

  return NextResponse.json({
    yandexMetrikaId,
    googleAnalyticsId,
  });
}

// Отключаем кэширование для всегда актуальных данных
export const revalidate = 0;
