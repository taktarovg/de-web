import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'

interface ProblemHeroProps {
  botUrl: string
}

export function AnxietyHero({ botUrl }: ProblemHeroProps) {
  return (
    <section id="hero-anxiety" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 mb-4">
              <span className="text-5xl">😰</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-slate-900">
            "Тревога не отпускает — даже когда всё в порядке"
          </h2>

          {/* Statistics */}
          <div className="text-center mb-10">
            <div className="inline-block bg-white rounded-xl px-6 py-4 shadow-lg border border-orange-200 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📊</span>
                <span className="font-bold text-2xl text-orange-600">52% женщин</span>
              </div>
              <p className="text-slate-700">
                испытывают тревогу на работе
              </p>
            </div>
            
            <div className="inline-block bg-white rounded-xl px-6 py-4 shadow-lg border border-orange-200 ml-0 md:ml-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📈</span>
                <span className="font-bold text-2xl text-orange-600">В 7 раз</span>
              </div>
              <p className="text-slate-700">
                больше обращений из-за тревоги с 2021 года
              </p>
            </div>
          </div>

          {/* "Узнаёте себя?" section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-slate-900">
              Узнаёте себя?
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Просыпаетесь с чувством беспокойства
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Прокручиваете в голове "а вдруг..."
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Тело напряжено, сложно расслабиться
                </p>
              </div>
            </div>

            {/* How bot helps */}
            <div className="pt-6 border-t border-slate-200">
              <h4 className="text-xl font-semibold mb-4 text-slate-900">
                Как бот помогает:
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Назвать тревогу точно (страх, волнение, паника?)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Найти триггеры: что именно запускает
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Научиться отпускать вместо накопления
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a href={botUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                Начать анализ эмоций <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <p className="text-sm text-slate-600 mt-4">
              Первый анализ занимает 5 минут
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
