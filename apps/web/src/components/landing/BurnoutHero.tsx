import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'

interface ProblemHeroProps {
  botUrl: string
}

export function BurnoutHero({ botUrl }: ProblemHeroProps) {
  return (
    <section id="hero-burnout" className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-slate-200 mb-4">
              <span className="text-5xl">🔥</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-slate-900">
            "Работаю на автомате — внутри пустота"
          </h2>

          {/* Statistics */}
          <div className="text-center mb-10 flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="inline-block bg-white rounded-xl px-6 py-4 shadow-lg border border-slate-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📊</span>
                <span className="font-bold text-2xl text-slate-700">63% женщин</span>
              </div>
              <p className="text-slate-600 text-sm">
                эмоциональный упадок на работе
              </p>
            </div>
            
            <div className="inline-block bg-white rounded-xl px-6 py-4 shadow-lg border border-slate-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">😶‍🌫️</span>
                <span className="font-bold text-2xl text-slate-700">46%</span>
              </div>
              <p className="text-slate-600 text-sm">
                истощены, работают на автомате
              </p>
            </div>
            
            <div className="inline-block bg-white rounded-xl px-6 py-4 shadow-lg border border-slate-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🚧</span>
                <span className="font-bold text-2xl text-slate-700">27%</span>
              </div>
              <p className="text-slate-600 text-sm">
                чувствуют себя в тупике
              </p>
            </div>
          </div>

          {/* "Это ваша история?" section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-slate-900">
              Это ваша история?
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-slate-700 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Утром не хочется вставать
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-slate-700 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Всё делаете, но не чувствуете
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-slate-700 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Раньше нравилось — сейчас всё равно
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
                  <ArrowRight className="h-5 w-5 text-slate-700 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Отделить усталость от выгорания
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-slate-700 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Найти, что именно истощает энергию
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-slate-700 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Понять, нужен отдых или смена подхода
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a href={botUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-gray-700 to-slate-800 hover:from-gray-800 hover:to-slate-900">
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
