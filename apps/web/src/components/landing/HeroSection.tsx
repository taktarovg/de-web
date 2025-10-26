'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

interface HeroSectionProps {
  botUrl: string
}

const hawkinsLevels = [
  { level: 50, name: 'Апатия', emoji: '😶', color: 'from-slate-400 to-slate-500' },
  { level: 75, name: 'Печаль', emoji: '😢', color: 'from-blue-400 to-blue-500' },
  { level: 100, name: 'Страх', emoji: '😨', color: 'from-coral-400 to-coral-500' },
  { level: 125, name: 'Вожделение', emoji: '🤤', color: 'from-amber-400 to-amber-500' },
  { level: 150, name: 'Злость', emoji: '😡', color: 'from-red-500 to-coral-500' },
  { level: 175, name: 'Гордыня', emoji: '😏', color: 'from-rose-400 to-rose-500' },
  { level: 200, name: 'Мужество', emoji: '💪', color: 'from-amber-500 to-amber-600' },
  { level: 350, name: 'Принятие', emoji: '🤗', color: 'from-sage-400 to-sage-500' },
  { level: 600, name: 'Умиротворение', emoji: '🙏', color: 'from-calm-400 to-calm-500' },
]

export function HeroSection({ botUrl }: HeroSectionProps) {
  const [activeLevel, setActiveLevel] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLevel((prev) => (prev + 1) % hawkinsLevels.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-calm-50 via-sage-50 to-cloud py-20 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-calm-200 mb-6">
              <Sparkles className="h-4 w-4 text-calm-600" />
              <span className="text-sm font-medium text-calm-700">Бесплатный Telegram-бот</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              От <span className="text-slate-500">апатии</span> к{' '}
              <span className="bg-gradient-to-r from-calm-600 via-sage-600 to-ocean-600 bg-clip-text text-transparent">
                умиротворению
              </span>{' '}
              за 30 дней
            </h1>
            
            <p className="text-xl text-ocean-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              Научитесь управлять эмоциями через проверенную систему: 
              <span className="font-semibold text-ocean-600"> 108 эмоций</span>,{' '}
              <span className="font-semibold text-ocean-600">шкалу Хокинса</span> и{' '}
              <span className="font-semibold text-ocean-600">метод Седона</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a href={botUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-calm-500 to-sage-500 hover:from-calm-600 hover:to-sage-600 text-white">
                  Начать бесплатно <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#results">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-sage-500 text-sage-600 hover:bg-sage-50">
                  Смотреть результаты
                </Button>
              </a>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-ocean-400">
              <div className="flex items-center gap-1">
                <span className="text-sage-600">✓</span>
                <span>Бесплатно навсегда</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sage-600">✓</span>
                <span>Без рекламы</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sage-600">✓</span>
                <span>24/7 доступ</span>
              </div>
            </div>
          </div>
          
          {/* Right: Animated Hawkins Scale */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-ocean-600 mb-2">
                Шкала Хокинса (20-1000)
              </h3>
              <p className="text-sm text-ocean-400">
                Смотрите как растёт ваш уровень сознания
              </p>
            </div>
            
            <div className="space-y-3">
              {hawkinsLevels.map((item, index) => {
                const isActive = index === activeLevel
                const isPassed = index < activeLevel
                
                return (
                  <div
                    key={item.level}
                    className={`relative flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-r ' + item.color + ' text-white scale-105 shadow-lg'
                        : isPassed
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    <div className={`text-3xl transition-all duration-300 ${
                      isActive ? 'scale-125' : 'scale-100'
                    }`}>
                      {item.emoji}
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className={`text-sm ${isActive ? 'text-white/80' : ''}`}>
                        Уровень {item.level}
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="absolute -right-2 -top-2">
                        <Sparkles className="h-6 w-6 text-amber-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                Анимация показывает ваш прогресс по шкале
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
