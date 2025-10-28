import { Heart, Brain, Sparkles, Target, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Манифест метода Дизайн Эмоций',
  description: 'Философия и принципы осознанного управления эмоциями'
}

export default function ManifestPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Манифест метода<br/>Дизайн Эмоций
            </h1>
            <p className="text-xl text-calm-50">
              Не понимай эмоции. Проектируй их.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            
            {/* Intro */}
            <div className="text-center">
              <p className="text-xl text-ocean-500 leading-relaxed italic">
                "Эмоции не случайны. Они — результат ваших мыслей, убеждений и паттернов поведения. 
                Значит, их можно проектировать."
              </p>
            </div>

            {/* Problem */}
            <div>
              <h2 className="text-3xl font-bold text-ocean-500 mb-4">Проблема</h2>
              <p className="text-ocean-400 leading-relaxed mb-4">
                Большинство людей живут в реактивном режиме: эмоции накрывают волной, и кажется, 
                что ты не контролируешь происходящее. Радость, гнев, страх, апатия — всё это 
                воспринимается как нечто внешнее, что «случается» с нами.
              </p>
              <p className="text-ocean-400 leading-relaxed">
                Психология предлагает «понять» эмоции. Но понимание часто останавливается на уровне 
                анализа, не давая инструментов для реальных изменений.
              </p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-3xl font-bold text-ocean-500 mb-4">Решение</h2>
              <p className="text-ocean-400 leading-relaxed mb-4">
                <strong className="text-ocean-500">Дизайн Эмоций</strong> — это метод осознанного управления 
                эмоциональным состоянием через систематизацию, измерение и трансформацию.
              </p>
              <p className="text-ocean-400 leading-relaxed">
                Мы не боремся с эмоциями и не подавляем их. Мы проектируем нужное состояние, 
                используя проверенные инструменты:
              </p>
            </div>

            {/* Three Pillars */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-xl border border-rose-200">
                <Heart className="h-10 w-10 text-rose-500 mb-3" />
                <h3 className="text-xl font-semibold text-ocean-500 mb-2">108 эмоций</h3>
                <p className="text-sm text-ocean-400">
                  Детальный каталог для точной идентификации эмоционального состояния
                </p>
              </div>

              <div className="bg-gradient-to-br from-calm-50 to-calm-100 p-6 rounded-xl border border-calm-200">
                <Target className="h-10 w-10 text-calm-500 mb-3" />
                <h3 className="text-xl font-semibold text-ocean-500 mb-2">Шкала Хокинса</h3>
                <p className="text-sm text-ocean-400">
                  Уровни сознания от 20 до 1000 для измерения роста
                </p>
              </div>

              <div className="bg-gradient-to-br from-sage-50 to-sage-100 p-6 rounded-xl border border-sage-200">
                <Sparkles className="h-10 w-10 text-sage-500 mb-3" />
                <h3 className="text-xl font-semibold text-ocean-500 mb-2">8 шагов Седона</h3>
                <p className="text-sm text-ocean-400">
                  Метод трансформации эмоций через осознанность
                </p>
              </div>
            </div>

            {/* Principles */}
            <div>
              <h2 className="text-3xl font-bold text-ocean-500 mb-6">Принципы метода</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-calm-500 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean-500 mb-1">Эмоции — это данные</h3>
                    <p className="text-ocean-400">
                      Каждая эмоция несёт информацию о ваших мыслях, убеждениях и текущем состоянии. 
                      Мы учимся считывать эти данные.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-sage-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean-500 mb-1">Измеримый прогресс</h3>
                    <p className="text-ocean-400">
                      Вы не можете улучшить то, что не измеряете. Шкала Хокинса даёт объективную 
                      метрику эмоционального роста.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-calm-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean-500 mb-1">Систематическая практика</h3>
                    <p className="text-ocean-400">
                      Эмоциональный интеллект — это навык. Как и любой навык, он развивается через 
                      регулярную практику, а не разовые инсайты.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-sage-500 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean-500 mb-1">Технологии на службе осознанности</h3>
                    <p className="text-ocean-400">
                      Telegram-бот, аналитика, визуализация — современные инструменты делают практику 
                      доступной и эффективной.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-calm-500 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean-500 mb-1">От реакции к проактивности</h3>
                    <p className="text-ocean-400">
                      Вместо того чтобы реагировать на эмоции, мы учимся выбирать нужное состояние 
                      и сознательно двигаться к нему.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-r from-calm-50 to-sage-50 p-8 rounded-2xl border border-calm-200">
              <h2 className="text-3xl font-bold text-ocean-500 mb-4">Наше видение</h2>
              <p className="text-ocean-400 leading-relaxed mb-4">
                Мы создаём мир, где эмоциональный интеллект — это не привилегия немногих, а базовый 
                навык каждого человека. Где люди осознанно выбирают своё состояние, а не живут в 
                плену реактивных паттернов.
              </p>
              <p className="text-ocean-400 leading-relaxed">
                <strong className="text-ocean-500">Дизайн Эмоций</strong> — это не просто метод. 
                Это новый подход к жизни, где вы становитесь архитектором своего эмоционального опыта.
              </p>
            </div>

            {/* Quote */}
            <div className="text-center py-8">
              <p className="text-2xl text-ocean-500 font-semibold italic">
                "Не понимай эмоции. Проектируй их."
              </p>
              <p className="text-ocean-400 mt-4">— Георгий Тактаров, создатель метода</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-calm-500 via-calm-600 to-sage-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы стать дизайнером своих эмоций?
          </h2>
          <p className="text-calm-50 mb-8 max-w-2xl mx-auto">
            Начните бесплатный 30-дневный курс "Дневник Эмоций" в Telegram
          </p>
          <Link href="/bot">
            <Button size="lg" className="bg-white text-calm-600 hover:bg-cloud">
              Начать сейчас <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-ocean-400">
          <p>© 2025 ИП Тактаров Георгий Викторович. Все права защищены.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/legal/privacy" className="hover:text-calm-500">Политика конфиденциальности</Link>
            <Link href="/legal/terms" className="hover:text-calm-500">Пользовательское соглашение</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
