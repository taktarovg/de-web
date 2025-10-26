import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'

interface ProblemHeroProps {
  botUrl: string
}

export function EmotionRegulationHero({ botUrl }: ProblemHeroProps) {
  return (
    <section id="hero-emotions" className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-pink-100 mb-4">
              <span className="text-5xl">😡</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-slate-900">
            "Срываюсь на близких — а потом ужасно стыдно"
          </h2>

          {/* Statistics */}
          <div className="text-center mb-10">
            <div className="inline-block bg-white rounded-xl px-6 py-4 shadow-lg border border-pink-200 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📊</span>
                <span className="font-bold text-2xl text-pink-600">28% обращений</span>
              </div>
              <p className="text-slate-700">
                связаны с раздражительностью, агрессией, плаксивостью
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto mt-4 bg-white rounded-xl px-6 py-4 shadow-lg border border-pink-200">
              <p className="text-slate-700 text-center">
                <span className="font-semibold text-slate-900">От женщин ждут спокойствия</span>, 
                но за сильные эмоции могут назвать "истеричкой"
              </p>
            </div>
          </div>

          {/* "Это про вас?" section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-slate-900">
              Это про вас?
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-pink-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Не сдержались — накричали на ребёнка
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-pink-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Взорвались на коллегу из-за мелочи
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-pink-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700">
                  Плачете без повода, а потом злитесь на себя
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
                  <ArrowRight className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Понять, что за злостью (усталость? обида?)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Поймать эмоцию ДО срыва
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Отпустить без подавления и взрывов
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a href={botUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
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
