import { Header, Footer } from '@/components/layout';
import { Heart, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Георгий Тактаров - Создатель метода Дизайн Эмоций',
  description: 'О создателе метода осознанного управления эмоциями'
};

export default function TaktarovPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-graphite via-graphite-light to-midnight">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ivory mb-6">
              Георгий Тактаров
            </h1>
            <p className="text-xl md:text-2xl text-ivory/80">
              Создатель метода "Дизайн Эмоций"
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-6">О создателе</h2>
              <p className="text-lg text-graphite/80 leading-relaxed">
                Меня зовут Георгий Тактаров, и я посвятил последние годы изучению и систематизации 
                методов работы с эмоциональным интеллектом. Метод "Дизайн Эмоций" родился из 
                синтеза классической техники Седона и научного подхода шкалы Хокинса.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-6">Моя миссия</h2>
              <p className="text-lg text-graphite/80 leading-relaxed">
                Я верю, что осознанное управление эмоциями — это навык, который можно и нужно 
                развивать. Моя цель — сделать инструменты эмоционального интеллекта доступными 
                каждому через современные технологии и научный подход.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-6">
                Почему метод "Дизайн Эмоций"?
              </h2>
              <p className="text-lg text-graphite/80 leading-relaxed mb-6">
                Существует множество подходов к работе с эмоциями, но большинство из них либо 
                слишком эзотеричны, либо академичны. Я создал метод, который объединяет:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-ivory rounded-lg border border-bronze/20">
                  <span className="text-bronze text-xl">•</span>
                  <div>
                    <strong className="text-graphite font-semibold">Практичность</strong>
                    <p className="text-graphite/70 mt-1">Простые техники для ежедневного использования</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-ivory rounded-lg border border-bronze/20">
                  <span className="text-bronze text-xl">•</span>
                  <div>
                    <strong className="text-graphite font-semibold">Научность</strong>
                    <p className="text-graphite/70 mt-1">Измеримые показатели и аналитика</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-ivory rounded-lg border border-bronze/20">
                  <span className="text-bronze text-xl">•</span>
                  <div>
                    <strong className="text-graphite font-semibold">Доступность</strong>
                    <p className="text-graphite/70 mt-1">Через Telegram бота, который всегда под рукой</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-ivory rounded-lg border border-bronze/20">
                  <span className="text-bronze text-xl">•</span>
                  <div>
                    <strong className="text-graphite font-semibold">Системность</strong>
                    <p className="text-graphite/70 mt-1">108 эмоций в структурированной системе</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-6">Мои услуги</h2>
              <p className="text-lg text-graphite/80 leading-relaxed mb-4">
                Я предлагаю индивидуальные консультации и сессии по методу "Дизайн Эмоций". 
                Подробнее о моих услугах можно узнать на странице{' '}
                <Link href="/services" className="text-bronze hover:text-bronze-light underline transition-colors">
                  Услуги
                </Link>.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-6">Контакты</h2>
              <div className="flex flex-col gap-4">
                <a 
                  href="https://t.me/taktarov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-graphite/80 hover:text-bronze transition-colors p-4 bg-ivory rounded-lg border border-bronze/20"
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">Telegram: @taktarov</span>
                </a>
              </div>
            </div>

            {/* Legal Info */}
            <div className="pt-8 mt-8 border-t border-bronze/20">
              <h2 className="text-2xl md:text-3xl font-bold text-graphite mb-6">Юридическая информация</h2>
              <div className="space-y-2 text-graphite/70 bg-ivory p-6 rounded-lg border border-bronze/20">
                <p><strong className="text-graphite">ИП Тактаров Георгий Викторович</strong></p>
                <p>ОГРНИП: 325547600141358</p>
                <p>ИНН: 244400059945</p>
                <p>Дата регистрации: 28 августа 2025 года</p>
                <p className="text-sm pt-2 border-t border-bronze/10">
                  Основной вид деятельности: Деятельность по обработке данных, 
                  предоставление услуг по размещению информации (ОКВЭД 63.11)
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
            Готовы начать работу со мной?
          </h2>
          <p className="text-xl text-ivory/80 mb-10 max-w-2xl mx-auto">
            Запишитесь на консультацию или начните с бесплатного курса в Telegram
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button 
                size="lg" 
                className="bg-bronze hover:bg-bronze-light text-graphite font-semibold transition-all hover:shadow-xl"
              >
                Записаться на сессию
              </Button>
            </Link>
            <Link href="/bot">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-bronze text-bronze hover:bg-bronze/10 transition-all"
              >
                Попробовать бот
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
