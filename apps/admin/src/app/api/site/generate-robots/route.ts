import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST() {
  try {
    const baseUrl = 'https://designemotion.ru';

    const robotsTxt = `# designemotion.ru robots.txt
# Сгенерировано автоматически

User-agent: *
Allow: /

# Запрещаем индексацию служебных страниц
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /sw-dev.js

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Основные поисковики
User-agent: Yandex
Allow: /

User-agent: Googlebot
Allow: /
`;

    // Пробуем найти правильный путь
    const cwd = process.cwd();
    console.log('[Robots] Current directory:', cwd);
    
    let publicPath: string;
    let attempts: string[] = [];
    
    // Вариант 1: Development
    const devPath = path.join(cwd, '..', 'web', 'public', 'robots.txt');
    attempts.push(`Dev: ${devPath}`);
    
    // Вариант 2: Production
    const prodPath = path.join(cwd, 'public', 'robots.txt');
    attempts.push(`Prod: ${prodPath}`);
    
    // Вариант 3: Абсолютный
    const absolutePath = '/var/www/designemotion/web/public/robots.txt';
    attempts.push(`Absolute: ${absolutePath}`);

    publicPath = devPath;
    
    console.log('[Robots] Attempting to write to:', publicPath);
    await writeFile(publicPath, robotsTxt, 'utf-8');
    console.log('[Robots] Successfully written');

    return NextResponse.json({
      success: true,
      message: 'robots.txt успешно сгенерирован',
      path: '/robots.txt',
      debug: { cwd, publicPath, attempts },
    });
  } catch (error) {
    console.error('[Robots] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate robots.txt',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        cwd: process.cwd(),
      },
      { status: 500 }
    );
  }
}
