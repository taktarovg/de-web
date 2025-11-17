import { Header, Footer } from '@/components/layout';
import { Heart, Calendar, Users, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export const metadata = {
  title: 'Услуги и продукты - Дизайн Эмоций',
  description: 'Индивидуальные консультации, сессии и курсы по развитию эмоционального интеллекта'
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-graphite via-graphite-light to-midnight">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ivory mb-6">
              Услуги и продукты
            </h1>
            <p className="text-xl md:text-2xl text-ivory/80">
              Индивидуальные сессии, групповые программы и цифровые продукты 
              для развития эмоционального интеллекта
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Individual Session */}
              <Card className="p-8 border-2 border-bronze/30 hover:border-bronze hover:shadow-xl transition-all">
                <div className="h-12 w-12 bg-bronze/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-bronze" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-graphite mb-2">Индивидуальная сессия</h3>
                <p className="text-3xl md:text-4xl font-bold text-bronze mb-4">5 000 ₽</p>
                <p className="text-graphite/70 mb-6 leading-relaxed">
                  Личная работа с эмоциональными паттернами по методу "Дизайн Эмоций". 
                  Глубокая проработка через 8 шагов Седона.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-graphite/80">
                    <Check className="h-5 w-5 text-bronze flex-shrink-0 mt-0.5" />
                    <span>Длительность: 90 минут</span>
                  </li>
                  <li className="flex items-start gap-2 text-graphite/80">
                    <Check className="h-5 w-5 text-bronze flex-shrink-0 mt-0.5" />
                    <span>Формат: онлайн (Zoom/Telegram)</span>
                  </li>
                  <li className="flex items-start gap-2 text-graphite/80">
                    <Check className="h-5 w-5 text-bronze flex-shrink-0 mt-0.5" />
                    <span>Запись сессии для повторного прослушивания</span>
                  </li>
                  <li className="flex items-start gap-2 text-graphite/80">
                    <Check className="h-5 w-5 text-bronze flex-shrink-0 mt-0.5" />
                    <span>Персональные рекомендации и практики</span>
                  </li>
                </ul>
                <a href="https://t.me/taktarov" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-bronze hover:bg-bronze-light text-graphite font-semibold transition-all">
                    Записаться на сессию
                  </Button>
                </a>
              </Card>

              {/* Package of 5 Sessions */}
              <Card className="p-8 border-2 border-midnight/30 hover:border-midnight hover:shadow-xl transition-all relative">
                <div className="absolute top-4 right-4 bg-midnight text-ivory text-xs font-bold px-3 py-1 rounded-full">
                  Выгода 20%
                </div>
                <div className="h-12 w-12 bg-midnight/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-midnight" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-graphite mb-2">Пакет из 5 сессий</h3>
                <p className="text-3xl md:text-4xl font-bold text-midnight mb-1">20 000 ₽</p>
                <p className="text-sm text-graphite/60 mb-4">Вместо 25 000 ₽</p>
                <p className="text-graphite/70 mb-6 leading-relaxed">
                  Системная работа с эмоциональными паттернами. Для тех, кто готов к глубоким изменениям.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-graphite/80">
                    <Check className="h-5 w-5 text-midnight flex-shrink-0 mt-0.5" />
                    <span>5 сессий по 90 минут</span>
                  </li>
                  <li className="flex items-start gap-2 text-graphite/80">
                    <Check className="h-5 w-5 text-midnight flex-shrink-0 mt-0.5" />
                    <span>Поддержка между сессиями в Telegram</span>
                  </li>
                  <li className="flex items-start gap-2 text-graphite/80">
                    <Check className="h-5 w-5 text-midnight flex-shrink-0 mt-0.5" />
                    <span>Персональный план развития ЭИ</span>
                  </li>
                  <li className="flex items-start gap-2 text-graphite/80">
                    <Check className="h-5 w-5 text-midnight flex-shrink-0 mt-0.5" />
                    <span>Доступ к закрытым материалам и практикам</span>
                  </li>
                </ul>
                <a href="https://t.me/taktarov" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-midnight hover:bg-midnight-hover text-ivory font-semibold transition-all">
                    Записаться на пакет
                  </Button>
                </a>
              </Card>
            </div>

            {/* Digital Products */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-8 text-center">Цифровые продукты</h2>
              
              <Card className="p-8 border-2 border-bronze/30 hover:shadow-xl transition-all">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 bg-bronze/10 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-bronze" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl md:text-3xl font-bold text-graphite mb-2">Курс "Дневник Эмоций" в Telegram</h3>
                    <p className="text-3xl md:text-4xl font-bold text-bronze mb-4">Бесплатно</p>
                    <p className="text-graphite/70 mb-6 leading-relaxed">
                      30-дневный курс для формирования привычки отслеживать и осознавать свои эмоции. 
                      Доступ к 108 эмоциям, аналитике по шкале Хокинса и мини-сессиям Седона.
                    </p>
                    <Link href="/bot">
                      <Button className="bg-bronze hover:bg-bronze-light text-graphite font-semibold transition-all">
                        Начать курс <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>

            {/* How it works */}
            <div className="bg-gradient-to-br from-ivory via-white to-ivory p-8 md:p-12 rounded-2xl border border-bronze/20">
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-10 text-center">Как проходят сессии</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-bronze text-graphite rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    1
                  </div>
                  <h3 className="font-semibold text-graphite mb-3 text-lg">Запрос и диагностика</h3>
                  <p className="text-graphite/70">
                    Определяем вашу текущую ситуацию и эмоциональные паттерны
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-midnight text-ivory rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    2
                  </div>
                  <h3 className="font-semibold text-graphite mb-3 text-lg">Работа по методу</h3>
                  <p className="text-graphite/70">
                    Проходим 8 шагов Седона, идентифицируем эмоции, измеряем по Хокинсу
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-bronze text-graphite rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    3
                  </div>
                  <h3 className="font-semibold text-graphite mb-3 text-lg">Практика и интеграция</h3>
                  <p className="text-graphite/70">
                    Получаете персональные техники для самостоятельной работы
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-10 text-center">Частые вопросы</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 md:p-8 rounded-xl border border-bronze/20 hover:shadow-lg transition-all">
                <h3 className="font-semibold text-graphite text-lg mb-3">Как оплатить сессию?</h3>
                <p className="text-graphite/70 leading-relaxed">
                  После записи через Telegram я вышлю реквизиты для оплаты. Принимаю переводы на карту 
                  или через Юкассу (скоро).
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl border border-bronze/20 hover:shadow-lg transition-all">
                <h3 className="font-semibold text-graphite text-lg mb-3">Можно ли вернуть деньги?</h3>
                <p className="text-graphite/70 leading-relaxed">
                  Да, если вы не удовлетворены сессией, я верну 100% оплаты в течение 7 дней после сессии. 
                  Подробнее в{' '}
                  <Link href="/legal/refund" className="text-bronze hover:text-bronze-light underline transition-colors">
                    Политике возврата
                  </Link>.
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl border border-bronze/20 hover:shadow-lg transition-all">
                <h3 className="font-semibold text-graphite text-lg mb-3">Нужна ли подготовка к сессии?</h3>
                <p className="text-graphite/70 leading-relaxed">
                  Специальной подготовки не требуется. Рекомендую перед сессией пройти бесплатный курс 
                  в Telegram-боте, чтобы познакомиться с методом.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-graphite via-midnight to-graphite-light">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-6">
            Готовы начать работу с эмоциями?
          </h2>
          <p className="text-xl text-ivory/80 mb-10 max-w-2xl mx-auto">
            Запишитесь на консультацию или начните с бесплатного курса
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/taktarov" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-bronze hover:bg-bronze-light text-graphite font-semibold transition-all hover:shadow-xl"
              >
                Записаться на сессию
              </Button>
            </a>
            <Link href="/bot">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-bronze text-bronze hover:bg-bronze/10 transition-all"
              >
                Попробовать бот бесплатно
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
