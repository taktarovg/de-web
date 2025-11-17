import { Header, Footer } from '@/components/layout';
import { Heart, Brain, Sparkles, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Манифест метода Дизайн Эмоций',
  description: 'Философия и принципы осознанного управления эмоциями'
};

export default function ManifestPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-graphite via-graphite-light to-midnight">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ivory mb-6 leading-tight">
              Манифест метода<br/>Дизайн Эмоций
            </h1>
            <p className="text-2xl md:text-3xl text-bronze font-medium">
              Не понимай эмоции. Проектируй их.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-16">
            
            {/* Intro */}
            <div className="text-center">
              <p className="text-xl md:text-2xl text-graphite/80 leading-relaxed italic">
                "Эмоции не случайны. Они — результат ваших мыслей, убеждений и паттернов поведения. 
                Значит, их можно проектировать."
              </p>
            </div>

            {/* Problem */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-6">Проблема</h2>
              <p className="text-lg text-graphite/80 leading-relaxed mb-4">
                Большинство людей живут в реактивном режиме: эмоции накрывают волной, и кажется, 
                что ты не контролируешь происходящее. Радость, гнев, страх, апатия — всё это 
                воспринимается как нечто внешнее, что «случается» с нами.
              </p>
              <p className="text-lg text-graphite/80 leading-relaxed">
                Психология предлагает «понять» эмоции. Но понимание часто останавливается на уровне 
                анализа, не давая инструментов для реальных изменений.
              </p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-6">Решение</h2>
              <p className="text-lg text-graphite/80 leading-relaxed mb-4">
                <strong className="text-graphite font-semibold">Дизайн Эмоций</strong> — это метод осознанного управления 
                эмоциональным состоянием через систематизацию, измерение и трансформацию.
              </p>
              <p className="text-lg text-graphite/80 leading-relaxed">
                Мы не боремся с эмоциями и не подавляем их. Мы проектируем нужное состояние, 
                используя проверенные инструменты:
              </p>
            </div>

            {/* Three Pillars */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-bronze/10 to-bronze/5 p-6 rounded-xl border border-bronze/30 hover:shadow-lg transition-all">
                <Heart className="h-10 w-10 text-bronze mb-4" />
                <h3 className="text-xl font-semibold text-graphite mb-2">108 эмоций</h3>
                <p className="text-sm text-graphite/70 leading-relaxed">
                  Детальный каталог для точной идентификации эмоционального состояния
                </p>
              </div>

              <div className="bg-gradient-to-br from-midnight/10 to-midnight/5 p-6 rounded-xl border border-midnight/30 hover:shadow-lg transition-all">
                <Target className="h-10 w-10 text-midnight mb-4" />
                <h3 className="text-xl font-semibold text-graphite mb-2">Шкала Хокинса</h3>
                <p className="text-sm text-graphite/70 leading-relaxed">
                  Уровни сознания от 20 до 1000 для измерения роста
                </p>
              </div>

              <div className="bg-gradient-to-br from-bronze/10 to-bronze/5 p-6 rounded-xl border border-bronze/30 hover:shadow-lg transition-all">
                <Sparkles className="h-10 w-10 text-bronze mb-4" />
                <h3 className="text-xl font-semibold text-graphite mb-2">8 шагов Седона</h3>
                <p className="text-sm text-graphite/70 leading-relaxed">
                  Метод трансформации эмоций через осознанность
                </p>
              </div>
            </div>

            {/* Principles */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-8">Принципы метода</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-ivory rounded-lg border border-bronze/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-bronze text-graphite rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-graphite mb-2">Эмоции — это данные</h3>
                    <p className="text-graphite/70 leading-relaxed">
                      Каждая эмоция несёт информацию о ваших мыслях, убеждениях и текущем состоянии. 
                      Мы учимся считывать эти данные.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-ivory rounded-lg border border-bronze/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-midnight text-ivory rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-graphite mb-2">Измеримый прогресс</h3>
                    <p className="text-graphite/70 leading-relaxed">
                      Вы не можете улучшить то, что не измеряете. Шкала Хокинса даёт объективную 
                      метрику эмоционального роста.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-ivory rounded-lg border border-bronze/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-bronze text-graphite rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-graphite mb-2">Систематическая практика</h3>
                    <p className="text-graphite/70 leading-relaxed">
                      Эмоциональный интеллект — это навык. Как и любой навык, он развивается через 
                      регулярную практику, а не разовые инсайты.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-ivory rounded-lg border border-bronze/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-midnight text-ivory rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-graphite mb-2">Технологии на службе осознанности</h3>
                    <p className="text-graphite/70 leading-relaxed">
                      Telegram-бот, аналитика, визуализация — современные инструменты делают практику 
                      доступной и эффективной.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-ivory rounded-lg border border-bronze/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-bronze text-graphite rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-graphite mb-2">От реакции к проактивности</h3>
                    <p className="text-graphite/70 leading-relaxed">
                      Вместо того чтобы реагировать на эмоции, мы учимся выбирать нужное состояние 
                      и сознательно двигаться к нему.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-graphite to-midnight p-8 md:p-12 rounded-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-6">Наше видение</h2>
              <p className="text-lg text-ivory/90 leading-relaxed mb-4">
                Мы создаём мир, где эмоциональный интеллект — это не привилегия немногих, а базовый 
                навык каждого человека. Где люди осознанно выбирают своё состояние, а не живут в 
                плену реактивных паттернов.
              </p>
              <p className="text-lg text-ivory/90 leading-relaxed">
                <strong className="text-bronze">Дизайн Эмоций</strong> — это не просто метод. 
                Это новый подход к жизни, где вы становитесь архитектором своего эмоционального опыта.
              </p>
            </div>

            {/* Quote */}
            <div className="text-center py-8 border-t border-b border-bronze/20">
              <p className="text-2xl md:text-3xl text-graphite font-semibold italic mb-4">
                "Не понимай эмоции. Проектируй их."
              </p>
              <p className="text-graphite/70">— Георгий Тактаров, создатель метода</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-graphite via-midnight to-graphite-light">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-6">
            Готовы стать дизайнером своих эмоций?
          </h2>
          <p className="text-xl text-ivory/80 mb-10 max-w-2xl mx-auto">
            Начните с персональной сессии или изучите метод через открытые материалы
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#cta">
              <Button 
                size="lg" 
                className="bg-bronze hover:bg-bronze-light text-graphite font-semibold transition-all hover:shadow-xl"
              >
                Записаться на сессию
              </Button>
            </Link>
            <Link href="/">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-bronze text-bronze hover:bg-bronze/10 transition-all"
              >
                Открытые материалы <ArrowRight className="ml-2 h-5 w-5" />
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
