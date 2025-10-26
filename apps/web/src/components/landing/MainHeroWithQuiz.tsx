'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface MainHeroWithQuizProps {
  botUrl: string
}

const problems = [
  {
    id: 'self-esteem',
    emoji: '😔',
    title: 'Низкая самооценка и неуверенность',
    subtitle: '"Я недостаточно хороша..."',
    targetId: 'hero-self-esteem',
  },
  {
    id: 'anxiety',
    emoji: '😰',
    title: 'Постоянная тревога',
    subtitle: '"Не могу расслабиться..."',
    targetId: 'hero-anxiety',
  },
  {
    id: 'emotions',
    emoji: '😡',
    title: 'Срываюсь на близких',
    subtitle: '"Потом ужасно стыдно..."',
    targetId: 'hero-emotions',
  },
  {
    id: 'burnout',
    emoji: '🔥',
    title: 'Выгорание на работе',
    subtitle: '"Работаю на автомате..."',
    targetId: 'hero-burnout',
  },
  {
    id: 'depression',
    emoji: '😶',
    title: 'Апатия и грусть',
    subtitle: '"Ничего не хочется..."',
    targetId: 'hero-depression',
  },
]

export function MainHeroWithQuiz({ botUrl }: MainHeroWithQuizProps) {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null)

  const handleProblemClick = (targetId: string, problemId: string) => {
    setSelectedProblem(problemId)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleViewAll = () => {
    const element = document.getElementById('hero-self-esteem')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-white py-20 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Новый уровень комфорта в жизни через{' '}
              <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                понимание и принятие своих эмоций
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-4 max-w-3xl mx-auto">
              Когда эмоции управляют вами — жизнь превращается в качели. 
              Когда вы управляете эмоциями — обретаете устойчивость и спокойствие.
            </p>
            
            <p className="text-lg text-slate-600">
              Бесплатный Telegram-бот поможет разобраться прямо сейчас.
            </p>
          </div>

          {/* Quiz Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-rose-600 mb-3">
                <span className="text-2xl">⚡</span>
                <h2 className="text-2xl font-bold">Что беспокоит вас больше всего?</h2>
              </div>
              <p className="text-slate-600">
                Выберите, и мы расскажем как бот может помочь
              </p>
            </div>

            {/* Problem Cards */}
            <div className="space-y-3 mb-8">
              {problems.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => handleProblemClick(problem.targetId, problem.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedProblem === problem.id
                      ? 'border-rose-600 bg-rose-50 shadow-md scale-[1.02]'
                      : 'border-slate-200 bg-white hover:border-rose-300 hover:shadow-sm hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{problem.emoji}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 mb-1">
                        {problem.title}
                      </div>
                      <div className="text-sm text-slate-600 italic">
                        {problem.subtitle}
                      </div>
                    </div>
                    <ArrowRight className={`h-5 w-5 flex-shrink-0 transition-all ${
                      selectedProblem === problem.id ? 'text-rose-600 translate-x-1' : 'text-slate-400'
                    }`} />
                  </div>
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={botUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700">
                  Начать анализ эмоций <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleViewAll}
                className="w-full sm:w-auto"
              >
                Посмотреть все решения
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <span className="text-green-600">✓</span>
                  <span>Бесплатно навсегда</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600">✓</span>
                  <span>Анонимно</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600">✓</span>
                  <span>Без рекламы</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600">✓</span>
                  <span>24/7 доступ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
