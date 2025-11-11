import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // Читаем .env файл веб-приложения
    const envPath = path.join(process.cwd(), '..', 'web', '.env');
    const envContent = await readFile(envPath, 'utf-8');

    // Парсим переменные
    const yandexMatch = envContent.match(/NEXT_PUBLIC_YANDEX_METRIKA_ID="([^"]*)"/);
    const googleMatch = envContent.match(/NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="([^"]*)"/);

    const yandexMetrikaId = yandexMatch ? yandexMatch[1] : '';
    const googleAnalyticsId = googleMatch ? googleMatch[1] : '';

    return NextResponse.json({
      yandexMetrikaId,
      googleAnalyticsId,
    });
  } catch (error) {
    console.error('Error reading analytics settings:', error);
    return NextResponse.json(
      {
        yandexMetrikaId: '',
        googleAnalyticsId: '',
        error: 'Failed to read settings',
      },
      { status: 500 }
    );
  }
}

export const revalidate = 0;
