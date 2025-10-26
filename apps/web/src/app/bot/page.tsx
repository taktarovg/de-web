import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  MainHeroWithQuiz,
  SelfEsteemHero,
  AnxietyHero,
  EmotionRegulationHero,
  BurnoutHero,
  DepressionHero,
  ResultsSection,
  EmotionsMapSection,
  TestimonialsSection,
  CTASection 
} from '@/components/landing'

export const metadata = {
  title: 'Telegram-бот для эмоционального интеллекта | Дизайн Эмоций',
  description: 'От апатии к умиротворению за 30 дней. 108 эмоций, шкала Хокинса, метод Седона. Начните бесплатно.',
}

export default function BotPage() {
  const botUrl = process.env.NEXT_PUBLIC_BOT_URL || 'https://t.me/Emotiondesignbot'

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-600" />
            <span className="font-bold text-xl">Дизайн Эмоций</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero-self-esteem" className="text-slate-600 hover:text-slate-900 transition-colors">Самооценка</a>
            <a href="#hero-anxiety" className="text-slate-600 hover:text-slate-900 transition-colors">Тревога</a>
            <a href="#hero-emotions" className="text-slate-600 hover:text-slate-900 transition-colors">Эмоции</a>
            <a href="#hero-burnout" className="text-slate-600 hover:text-slate-900 transition-colors">Выгорание</a>
            <a href="#hero-depression" className="text-slate-600 hover:text-slate-900 transition-colors">Апатия</a>
          </div>
          <div className="flex items-center gap-4">
            <a href={botUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button>Начать</Button>
            </a>
            <Link href="/">
              <Button variant="ghost" className="text-slate-600">Главная</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Hero with Quiz */}
      <MainHeroWithQuiz botUrl={botUrl} />

      {/* 5 Problem-Specific Hero Sections */}
      <SelfEsteemHero botUrl={botUrl} />
      <AnxietyHero botUrl={botUrl} />
      <EmotionRegulationHero botUrl={botUrl} />
      <BurnoutHero botUrl={botUrl} />
      <DepressionHero botUrl={botUrl} />

      {/* Results Section - Before/After transformations */}
      <div id="results">
        <ResultsSection />
      </div>

      {/* Emotions Map Section - 108 emotions */}
      <div id="emotions-map">
        <EmotionsMapSection />
      </div>

      {/* Testimonials Section - Social proof */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* Final CTA Section */}
      <CTASection botUrl={botUrl} />

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-rose-600" />
                <span className="font-bold text-lg">Дизайн Эмоций</span>
              </Link>
              <p className="text-slate-600 mb-4 max-w-md">
                Платформа для развития эмоционального интеллекта через метод Седона, 
                шкалу Хокинса и каталог из 108 эмоций
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://t.me/Emotiondesignbot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Telegram
                </a>
                <a 
                  href="mailto:hello@designemotion.ru"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-slate-900">Проблемы</h3>
              <div className="space-y-3 text-sm">
                <div><a href="#hero-self-esteem" className="text-slate-600 hover:text-slate-900 transition-colors">Самооценка</a></div>
                <div><a href="#hero-anxiety" className="text-slate-600 hover:text-slate-900 transition-colors">Тревога</a></div>
                <div><a href="#hero-emotions" className="text-slate-600 hover:text-slate-900 transition-colors">Эмоции</a></div>
                <div><a href="#hero-burnout" className="text-slate-600 hover:text-slate-900 transition-colors">Выгорание</a></div>
                <div><a href="#hero-depression" className="text-slate-600 hover:text-slate-900 transition-colors">Апатия</a></div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-slate-900">Продукт</h3>
              <div className="space-y-3 text-sm">
                <div><a href={botUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">Telegram-бот</a></div>
                <div><Link href="/dream" className="text-slate-600 hover:text-slate-900 transition-colors">Админка</Link></div>
                <div><a href="mailto:hello@designemotion.ru" className="text-slate-600 hover:text-slate-900 transition-colors">Поддержка</a></div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-600">
              © 2025 Дизайн Эмоций. Все права защищены.
            </div>
            <div className="flex gap-6 text-sm text-slate-600">
              <a href="#" className="hover:text-slate-900 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
