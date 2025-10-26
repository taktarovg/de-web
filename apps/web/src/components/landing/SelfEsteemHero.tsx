import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'

interface ProblemHeroProps {
  botUrl: string
}

export function SelfEsteemHero({ botUrl }: ProblemHeroProps) {
  return (
    <section id="hero-self-esteem" className="py-20 bg-gradient-to-br from-rose-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-rose-100 to-purple-100 mb-4">
              <span className="text-5xl">💭</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-slate-900">
            "Почему я всё время сомневаюсь в себе?"
          </h2>

          {/* Statistics */}
          <div className="text-center mb-10">
            <div className="inline-block bg-white rounded-xl px-6 py-4 shadow-lg border border-rose-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📊</span>
                <span className="font-bold text-2xl text-rose-600">1 из 2 женщин</span>
              </div>
              <p className="text-slate-700">
                обращается к психологу именно из-за проблем с самооценкой
              </p>
            </div>
          </div>

          {/* "Знакомо?" section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-slate-900">
              Знакомо?
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-rose-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  "Я недостаточно хороша для этой работы"
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-rose-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  "Другие справляются лучше меня"
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-rose-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  "Я постоянно сравниваю себя с другими"
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
                  <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Найти корень неуверенности через 8 вопросов
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Отследить ситуации, где падает самооценка
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Понять свою ценность без внешней оценки
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a href={botUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700">
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
