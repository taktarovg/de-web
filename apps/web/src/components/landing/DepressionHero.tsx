import { Button } from '@/components/ui/button'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'

interface ProblemHeroProps {
  botUrl: string
}

export function DepressionHero({ botUrl }: ProblemHeroProps) {
  return (
    <section id="hero-depression" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-4">
              <span className="text-5xl">😶</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-slate-900">
            "Ничего не хочется — просто существую"
          </h2>

          {/* Statistics */}
          <div className="text-center mb-10">
            <div className="inline-block bg-white rounded-xl px-6 py-4 shadow-lg border border-indigo-200 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📊</span>
                <span className="font-bold text-2xl text-indigo-600">37%</span>
              </div>
              <p className="text-slate-700">
                называют депрессию причиной обращений к психологу
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto mt-4">
              <p className="text-slate-600 text-center">
                <span className="font-semibold text-slate-900">46%</span> переживают из-за денег, {' '}
                <span className="font-semibold text-slate-900">43%</span> — из-за ситуации в мире, {' '}
                <span className="font-semibold text-slate-900">38%</span> — страх перед будущим
              </p>
            </div>
          </div>

          {/* Important notice */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Важно:</h4>
                <p className="text-amber-800 text-sm">
                  Если подавленное состояние длится <span className="font-semibold">более 2 недель</span> — 
                  обратитесь к врачу-психотерапевту или психиатру. 
                  Бот поможет разобраться, если это временное состояние.
                </p>
              </div>
            </div>
          </div>

          {/* "Узнаёте это состояние?" section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-slate-900">
              Узнаёте это состояние?
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Раньше радовало — сейчас безразлично
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Чувство беспомощности перед жизнью
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Понимаете, что надо что-то делать, но нет сил
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
                  <ArrowRight className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Различить апатию, грусть, депрессию
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Найти, что забрало энергию
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Маленькие шаги к возвращению интереса
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a href={botUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Начать анализ эмоций <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <p className="text-sm text-slate-600 mt-4">
              Анонимно • Бесплатно • 5 минут
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
