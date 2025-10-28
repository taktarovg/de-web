import { Heart, Calendar, Users, Sparkles, Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export const metadata = {
  title: 'Услуги и продукты - Дизайн Эмоций',
  description: 'Индивидуальные консультации, сессии и курсы по развитию эмоционального интеллекта'
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-cloud">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-calm-500" />
            <span className="font-bold text-xl text-ocean-500">Дизайн Эмоций</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-calm-500 text-calm-600 hover:bg-calm-50">
              На главную
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-calm-500 via-calm-600 to-sage-500 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Услуги и продукты</h1>
            <p className="text-xl text-calm-50">
              Индивидуальные сессии, групповые программы и цифровые продукты 
              для развития эмоционального интеллекта
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Individual Session */}
              <Card className="p-8 border-2 border-calm-200 hover:border-calm-400 transition-colors">
                <div className="h-12 w-12 bg-calm-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-calm-600" />
                </div>
                <h3 className="text-2xl font-bold text-ocean-500 mb-2">Индивидуальная сессия</h3>
                <p className="text-3xl font-bold text-calm-600 mb-4">5 000 ₽</p>
                <p className="text-ocean-400 mb-6">
                  Личная работа с эмоциональными паттернами по методу "Дизайн Эмоций". 
                  Глубокая проработка через 8 шагов Седона.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-ocean-400">
                    <Check className="h-5 w-5 text-calm-500 flex-shrink-0 mt-0.5" />
                    <span>Длительность: 90 минут</span>
                  </li>
                  <li className="flex items-start gap-2 text-ocean-400">
                    <Check className="h-5 w-5 text-calm-500 flex-shrink-0 mt-0.5" />
                    <span>Формат: онлайн (Zoom/Telegram)</span>
                  </li>
                  <li className="flex items-start gap-2 text-ocean-400">
                    <Check className="h-5 w-5 text-calm-500 flex-shrink-0 mt-0.5" />
                    <span>Запись сессии для повторного прослушивания</span>
                  </li>
                  <li className="flex items-start gap-2 text-ocean-400">
                    <Check className="h-5 w-5 text-calm-500 flex-shrink-0 mt-0.5" />
                    <span>Персональные рекомендации и практики</span>
                  </li>
                </ul>
                <a href="https://t.me/taktarov" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-calm-500 hover:bg-calm-600">
                    Записаться на сессию
                  </Button>
                </a>
              </Card>

              {/* Package of 5 Sessions */}
              <Card className="p-8 border-2 border-sage-200 hover:border-sage-400 transition-colors relative">
                <div className="absolute top-4 right-4 bg-sage-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Выгода 20%
                </div>
                <div className="h-12 w-12 bg-sage-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-sage-600" />
                </div>
                <h3 className="text-2xl font-bold text-ocean-500 mb-2">Пакет из 5 сессий</h3>
                <p className="text-3xl font-bold text-sage-600 mb-1">20 000 ₽</p>
                <p className="text-sm text-ocean-400 mb-4">Вместо 25 000 ₽</p>
                <p className="text-ocean-400 mb-6">
                  Системная работа с эмоциональными паттернами. Для тех, кто готов к глубоким изменениям.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-ocean-400">
                    <Check className="h-5 w-5 text-sage-500 flex-shrink-0 mt-0.5" />
                    <span>5 сессий по 90 минут</span>
                  </li>
                  <li className="flex items-start gap-2 text-ocean-400">
                    <Check className="h-5 w-5 text-sage-500 flex-shrink-0 mt-0.5" />
                    <span>Поддержка между сессиями в Telegram</span>
                  </li>
                  <li className="flex items-start gap-2 text-ocean-400">
                    <Check className="h-5 w-5 text-sage-500 flex-shrink-0 mt-0.5" />
                    <span>Персональный план развития ЭИ</span>
                  </li>
                  <li className="flex items-start gap-2 text-ocean-400">
                    <Check className="h-5 w-5 text-sage-500 flex-shrink-0 mt-0.5" />
                    <span>Доступ к закрытым материалам и практикам</span>
                  </li>
                </ul>
                <a href="https://t.me/taktarov" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-sage-500 hover:bg-sage-600">
                    Записаться на пакет
                  </Button>
                </a>
              </Card>
            </div>

            {/* Digital Products */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-ocean-500 mb-6 text-center">Цифровые продукты</h2>
              
              <Card className="p-8 border-2 border-ocean-200">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 bg-ocean-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-ocean-600" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-ocean-500 mb-2">Курс "Дневник Эмоций" в Telegram</h3>
                    <p className="text-3xl font-bold text-ocean-600 mb-4">Бесплатно</p>
                    <p className="text-ocean-400 mb-6">
                      30-дневный курс для формирования привычки отслеживать и осознавать свои эмоции. 
                      Доступ к 108 эмоциям, аналитике по шкале Хокинса и мини-сессиям Седона.
                    </p>
                    <Link href="/bot">
                      <Button className="bg-ocean-500 hover:bg-ocean-600">
                        Начать курс <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>

            {/* How it works */}
            <div className="bg-gradient-to-r from-calm-50 to-sage-50 p-8 rounded-2xl border border-calm-200">
              <h2 className="text-3xl font-bold text-ocean-500 mb-6 text-center">Как проходят сессии</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-calm-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    1
                  </div>
                  <h3 className="font-semibold text-ocean-500 mb-2">Запрос и диагностика</h3>
                  <p className="text-sm text-ocean-400">
                    Определяем вашу текущую ситуацию и эмоциональные паттерны
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-sage-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    2
                  </div>
                  <h3 className="font-semibold text-ocean-500 mb-2">Работа по методу</h3>
                  <p className="text-sm text-ocean-400">
                    Проходим 8 шагов Седона, идентифицируем эмоции, измеряем по Хокинсу
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-calm-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    3
                  </div>
                  <h3 className="font-semibold text-ocean-500 mb-2">Практика и интеграция</h3>
                  <p className="text-sm text-ocean-400">
                    Получаете персональные техники для самостоятельной работы
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-cloud">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-ocean-500 mb-8 text-center">Частые вопросы</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-ocean-500 mb-2">Как оплатить сессию?</h3>
                <p className="text-ocean-400">
                  После записи через Telegram я вышлю реквизиты для оплаты. Принимаю переводы на карту 
                  или через Юкассу (скоро).
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-ocean-500 mb-2">Можно ли вернуть деньги?</h3>
                <p className="text-ocean-400">
                  Да, если вы не удовлетворены сессией, я верну 100% оплаты в течение 7 дней после сессии. 
                  Подробнее в <Link href="/legal/refund" className="text-calm-500 hover:underline">Политике возврата</Link>.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-ocean-500 mb-2">Нужна ли подготовка к сессии?</h3>
                <p className="text-ocean-400">
                  Специальной подготовки не требуется. Рекомендую перед сессией пройти бесплатный курс 
                  в Telegram-боте, чтобы познакомиться с методом.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-calm-500 via-calm-600 to-sage-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы начать работу с эмоциями?
          </h2>
          <p className="text-calm-50 mb-8 max-w-2xl mx-auto">
            Запишитесь на консультацию или начните с бесплатного курса
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/taktarov" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-calm-600 hover:bg-cloud">
                Записаться на сессию
              </Button>
            </a>
            <Link href="/bot">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Попробовать бот бесплатно
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-ocean-400">
          <p>© 2025 ИП Тактаров Георгий Викторович. Все права защищены.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/legal/privacy" className="hover:text-calm-500">Политика конфиденциальности</Link>
            <Link href="/legal/offer" className="hover:text-calm-500">Договор оферты</Link>
            <Link href="/legal/refund" className="hover:text-calm-500">Возврат средств</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
