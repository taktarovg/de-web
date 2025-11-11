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

    // Пробуем найти правильный путь
    const cwd = process.cwd();
    console.log('[Sitemap] Current directory:', cwd);
    
    let publicPath: string;
    let attempts: string[] = [];
    
    // Вариант 1: Development (apps/admin -> apps/web/public)
    const devPath = path.join(cwd, '..', 'web', 'public', 'sitemap.xml');
    attempts.push(`Dev: ${devPath}`);
    
    // Вариант 2: Production root
    const prodPath = path.join(cwd, 'public', 'sitemap.xml');
    attempts.push(`Prod: ${prodPath}`);
    
    // Вариант 3: Абсолютный путь
    const absolutePath = '/var/www/designemotion/web/public/sitemap.xml';
    attempts.push(`Absolute: ${absolutePath}`);

    // Пробуем сохранить
    publicPath = devPath; // По умолчанию development
    
    console.log('[Sitemap] Attempting to write to:', publicPath);
    await writeFile(publicPath, sitemap, 'utf-8');
    console.log('[Sitemap] Successfully written');

    return NextResponse.json({
      success: true,
      message: 'Sitemap успешно сгенерирован',
      path: '/sitemap.xml',
      debug: { cwd, publicPath, attempts },
    });
  } catch (error) {
    console.error('[Sitemap] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate sitemap',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        cwd: process.cwd(),
      },
      { status: 500 }
    );
  }
}
