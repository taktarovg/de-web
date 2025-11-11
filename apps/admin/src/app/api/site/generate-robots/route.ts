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

    // Сохраняем в public папку веб-приложения
    let publicPath: string;
    
    const cwd = process.cwd();
    
    if (cwd.includes('apps/admin') || cwd.includes('apps\\admin')) {
      publicPath = path.join(cwd, '..', 'web', 'public', 'robots.txt');
    } else if (cwd.includes('admin')) {
      publicPath = path.join(cwd, '..', 'web', 'public', 'robots.txt');
    } else {
      publicPath = path.join(cwd, 'apps', 'web', 'public', 'robots.txt');
    }

    await writeFile(publicPath, robotsTxt, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'robots.txt успешно сгенерирован',
      path: '/robots.txt',
      debug: { cwd, publicPath },
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate robots.txt',
        details: error instanceof Error ? error.message : 'Unknown error',
        cwd: process.cwd(),
      },
      { status: 500 }
    );
  }
}
