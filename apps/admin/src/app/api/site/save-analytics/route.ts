import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { yandexMetrikaId, googleAnalyticsId } = body;

    // Путь к .env файлу веб-приложения
    const envPath = path.join(process.cwd(), '..', 'web', '.env');

    // Читаем текущий .env
    let envContent = await readFile(envPath, 'utf-8');

    // Обновляем или добавляем переменные
    const updateEnvVar = (content: string, key: string, value: string) => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(content)) {
        // Обновляем существующую переменную
        return content.replace(regex, `${key}="${value}"`);
      } else {
        // Добавляем новую переменную
        return content + `\n${key}="${value}"`;
      }
    };

    envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_YANDEX_METRIKA_ID', yandexMetrikaId);
    envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID', googleAnalyticsId);

    // Сохраняем обновленный .env
    await writeFile(envPath, envContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Настройки аналитики сохранены. Перезапустите веб-сервер для применения изменений.',
      data: {
        yandexMetrikaId,
        googleAnalyticsId,
      },
    });
  } catch (error) {
    console.error('Error saving analytics settings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save analytics settings',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
