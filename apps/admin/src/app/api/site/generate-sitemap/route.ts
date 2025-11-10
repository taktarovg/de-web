import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST() {
  try {
    const baseUrl = 'https://designemotion.ru';
    const currentDate = new Date().toISOString();

    const pages = [
      {
        url: '/',
        changefreq: 'weekly',
        priority: '1.0',
        lastmod: currentDate,
      },
      {
        url: '/navigator-2026',
        changefreq: 'monthly',
        priority: '0.8',
        lastmod: currentDate,
      },
      {
        url: '/beauty-leaders',
        changefreq: 'monthly',
        priority: '0.8',
        lastmod: currentDate,
      },
      // Добавьте другие страницы по мере создания
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    // Сохраняем в public папку веб-приложения
    const publicPath = path.join(process.cwd(), '..', 'web', 'public', 'sitemap.xml');
    await writeFile(publicPath, sitemap, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Sitemap успешно сгенерирован',
      path: '/sitemap.xml',
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate sitemap' },
      { status: 500 }
    );
  }
}
