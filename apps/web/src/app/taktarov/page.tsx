import { Heart, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Георгий Тактаров - Создатель метода Дизайн Эмоций',
  description: 'О создателе метода осознанного управления эмоциями'
}

export default function TaktarovPage() {
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
            <h1 className="text-5xl font-bold mb-4">Георгий Тактаров</h1>
            <p className="text-xl text-calm-50">Создатель метода "Дизайн Эмоций"</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            
            <div>
              <h2 className="text-3xl font-bold text-ocean-500 mb-4">О создателе</h2>
              <p className="text-ocean-400 leading-relaxed">
                Меня зовут Георгий Тактаров, и я посвятил последние годы изучению и систематизации 
                методов работы с эмоциональным интеллектом. Метод "Дизайн Эмоций" родился из 
                синтеза классической техники Седона и научного подхода шкалы Хокинса.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-ocean-500 mb-4">Моя миссия</h2>
              <p className="text-ocean-400 leading-relaxed">
                Я верю, что осознанное управление эмоциями — это навык, который можно и нужно 
                развивать. Моя цель — сделать инструменты эмоционального интеллекта доступными 
                каждому через современные технологии и научный подход.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-ocean-500 mb-4">Почему метод "Дизайн Эмоций"?</h2>
              <p className="text-ocean-400 leading-relaxed mb-4">
                Существует множество подходов к работе с эмоциями, но большинство из них либо 
                слишком эзотеричны, либо академичны. Я создал метод, который объединяет:
              </p>
              <ul className="space-y-3 text-ocean-400">
                <li className="flex items-start">
                  <span className="text-calm-500 mr-2">•</span>
                  <div>
                    <strong className="text-ocean-500">Практичность</strong> — простые техники для ежедневного использования
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sage-500 mr-2">•</span>
                  <div>
                    <strong className="text-ocean-500">Научность</strong> — измеримые показатели и аналитика
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-calm-500 mr-2">•</span>
                  <div>
                    <strong className="text-ocean-500">Доступность</strong> — через Telegram бота, который всегда под рукой
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sage-500 mr-2">•</span>
                  <div>
                    <strong className="text-ocean-500">Системность</strong> — 108 эмоций в структурированной системе
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-ocean-500 mb-4">Мои услуги</h2>
              <p className="text-ocean-400 leading-relaxed mb-4">
                Я предлагаю индивидуальные консультации и сессии по методу "Дизайн Эмоций". 
                Подробнее о моих услугах можно узнать на странице{' '}
                <Link href="/services" className="text-calm-500 hover:text-calm-600 underline">
                  Услуги
                </Link>.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-ocean-500 mb-4">Контакты</h2>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://t.me/taktarov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ocean-400 hover:text-calm-500"
                >
                  <Mail className="h-5 w-5" />
                  <span>Telegram: @taktarov</span>
                </a>
              </div>
            </div>

            {/* Legal Info */}
            <div className="pt-8 mt-8 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-ocean-500 mb-4">Юридическая информация</h2>
              <div className="space-y-2 text-ocean-400">
                <p><strong className="text-ocean-500">ИП Тактаров Георгий Викторович</strong></p>
                <p>ОГРНИП: 325547600141358</p>
                <p>ИНН: 244400059945</p>
                <p>Дата регистрации: 28 августа 2025 года</p>
                <p className="text-sm">
                  Основной вид деятельности: Деятельность по обработке данных, 
                  предоставление услуг по размещению информации (ОКВЭД 63.11)
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
            Готовы начать работу со мной?
          </h2>
          <p className="text-calm-50 mb-8 max-w-2xl mx-auto">
            Запишитесь на консультацию или начните с бесплатного курса в Telegram
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button size="lg" className="bg-white text-calm-600 hover:bg-cloud">
                Записаться на сессию
              </Button>
            </Link>
            <Link href="/bot">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Попробовать бот
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
            <Link href="/legal/terms" className="hover:text-calm-500">Пользовательское соглашение</Link>
            <Link href="/legal/offer" className="hover:text-calm-500">Договор оферты</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
