'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  FileCode, 
  BarChart3, 
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SiteManagementPage() {
  const [yandexMetrikaId, setYandexMetrikaId] = useState('');
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Загрузка текущих значений из .env
  // TODO: Сделать API для чтения .env

  const handleSaveAnalytics = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/site/save-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ yandexMetrikaId, googleAnalyticsId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ ' + data.message);
      } else {
        alert('❌ Ошибка: ' + (data.error || 'Failed to save'));
      }
    } catch (error) {
      console.error('Error saving analytics:', error);
      alert('❌ Ошибка сохранения настроек');
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateSitemap = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/site/generate-sitemap', { method: 'POST' });
      if (response.ok) {
        alert('Sitemap успешно сгенерирован!');
      }
    } catch (error) {
      console.error('Error generating sitemap:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateRobots = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/site/generate-robots', { method: 'POST' });
      if (response.ok) {
        alert('robots.txt успешно сгенерирован!');
      }
    } catch (error) {
      console.error('Error generating robots.txt:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const pages = [
    { path: '/', title: 'Главная страница', status: 'active' },
    { path: '/navigator-2026', title: 'Интенсив "Навигатор 2026"', status: 'active' },
    { path: '/beauty-leaders', title: 'Для лидеров бьюти-индустрии', status: 'active' },
    { path: '/cases', title: 'Кейсы', status: 'draft' },
    { path: '/georgiy-taktarov', title: 'О Георгии Тактарове', status: 'draft' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Управление сайтом</h1>
        <p className="text-slate-600 mt-2">
          Настройка аналитики, SEO-файлов и управление страницами designemotion.ru
        </p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="analytics">
            <BarChart3 className="w-4 h-4 mr-2" />
            Аналитика
          </TabsTrigger>
          <TabsTrigger value="seo">
            <FileCode className="w-4 h-4 mr-2" />
            SEO файлы
          </TabsTrigger>
          <TabsTrigger value="pages">
            <Globe className="w-4 h-4 mr-2" />
            Каталог страниц
          </TabsTrigger>
        </TabsList>

        {/* Аналитика */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Yandex Metrika</CardTitle>
              <CardDescription>
                Подключите Яндекс Метрику для отслеживания посетителей сайта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yandex-id">ID счетчика Яндекс Метрики</Label>
                <Input
                  id="yandex-id"
                  placeholder="12345678"
                  value={yandexMetrikaId}
                  onChange={(e) => setYandexMetrikaId(e.target.value)}
                />
                <p className="text-sm text-slate-500">
                  Найдите ID в настройках счетчика на{' '}
                  <a
                    href="https://metrika.yandex.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    metrika.yandex.ru
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>

              {yandexMetrikaId && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Код Яндекс Метрики будет добавлен на сайт
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        ID: {yandexMetrikaId}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Google Analytics 4</CardTitle>
              <CardDescription>
                Подключите Google Analytics для расширенной аналитики
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-id">Measurement ID (GA4)</Label>
                <Input
                  id="google-id"
                  placeholder="G-XXXXXXXXXX"
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                />
                <p className="text-sm text-slate-500">
                  Найдите Measurement ID в{' '}
                  <a
                    href="https://analytics.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    Google Analytics 4
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>

              {googleAnalyticsId && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Код Google Analytics будет добавлен на сайт
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        Measurement ID: {googleAnalyticsId}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveAnalytics} size="lg" disabled={isSaving}>
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Сохранение...
                </>
              ) : (
                'Сохранить настройки аналитики'
              )}
            </Button>
          </div>
        </TabsContent>

        {/* SEO файлы */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>sitemap.xml</CardTitle>
              <CardDescription>
                Карта сайта для поисковых систем (Google, Yandex)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      Sitemap помогает поисковым системам индексировать ваш сайт
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Будут добавлены все активные страницы с приоритетами и частотой обновления
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleGenerateSitemap}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Генерация...
                    </>
                  ) : (
                    <>
                      <FileCode className="w-4 h-4 mr-2" />
                      Сгенерировать sitemap.xml
                    </>
                  )}
                </Button>

                <Button variant="outline" asChild>
                  <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Открыть
                  </a>
                </Button>

                <Button variant="outline" asChild>
                  <a href="/sitemap.xml" download>
                    <Download className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p>📍 Файл будет доступен по адресу: <code className="bg-slate-100 px-1.5 py-0.5 rounded">https://designemotion.ru/sitemap.xml</code></p>
                <p>📍 После генерации отправьте в Google Search Console и Яндекс Вебмастер</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>robots.txt</CardTitle>
              <CardDescription>
                Правила индексации для поисковых роботов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      robots.txt указывает поисковым роботам, какие страницы можно индексировать
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Будут разрешены все страницы, кроме служебных (admin, api)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleGenerateRobots}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Генерация...
                    </>
                  ) : (
                    <>
                      <FileCode className="w-4 h-4 mr-2" />
                      Сгенерировать robots.txt
                    </>
                  )}
                </Button>

                <Button variant="outline" asChild>
                  <a href="/robots.txt" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Открыть
                  </a>
                </Button>

                <Button variant="outline" asChild>
                  <a href="/robots.txt" download>
                    <Download className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p>📍 Файл будет доступен по адресу: <code className="bg-slate-100 px-1.5 py-0.5 rounded">https://designemotion.ru/robots.txt</code></p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Каталог страниц */}
        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Все страницы сайта</CardTitle>
              <CardDescription>
                Список всех страниц designemotion.ru с их статусами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pages.map((page) => (
                  <div
                    key={page.path}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-900">{page.title}</p>
                          <p className="text-sm text-slate-500 font-mono">{page.path}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        variant={page.status === 'active' ? 'default' : 'secondary'}
                        className={
                          page.status === 'active'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-slate-100 text-slate-600'
                        }
                      >
                        {page.status === 'active' ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Активна
                          </>
                        ) : (
                          'Черновик'
                        )}
                      </Badge>

                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`http://localhost:3000${page.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600">Всего страниц</p>
                  <p className="text-3xl font-bold text-slate-900">{pages.length}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600">Активных</p>
                  <p className="text-3xl font-bold text-green-900">
                    {pages.filter((p) => p.status === 'active').length}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600">Черновиков</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {pages.filter((p) => p.status === 'draft').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
