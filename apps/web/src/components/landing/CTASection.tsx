import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Sparkles } from 'lucide-react'

interface CTASectionProps {
  botUrl: string
}

const features = [
  'Бесплатно навсегда',
  '108 эмоций в каталоге',
  'Шкала Хокинса 20-1000',
  'Детальная статистика',
  '8-шаговый метод Седона',
  'Без рекламы и подписок',
]

export function CTASection({ botUrl }: CTASectionProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1))]" />
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">Присоединяйтесь к 500+ пользователям</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Начните трансформацию уже сегодня
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Откройте бота в Telegram и получите доступ ко всем инструментам для развития 
            эмоционального интеллекта. Навсегда. Бесплатно.
          </p>

          {/* Features grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <Check className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span className="text-white font-medium text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={botUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white text-rose-600 hover:bg-white/90 shadow-2xl text-lg px-8 py-6 h-auto font-semibold"
              >
                Открыть Telegram-бот <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>

          {/* Small print */}
          <div className="mt-8 space-y-2">
            <p className="text-white/80 text-sm">
              🔒 Ваши данные защищены | 🚫 Без спама | ⚡ Работает 24/7
            </p>
            <p className="text-white/60 text-xs">
              Регистрация не требуется. Просто откройте бота и начните.
            </p>
          </div>

          {/* Social proof */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['👨', '👩', '👴', '👨‍💼'].map((emoji, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-lg"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="text-sm">
                  <span className="font-semibold text-white">500+</span> человек уже используют
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-300 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm">
                  <span className="font-semibold text-white">4.9</span> средняя оценка
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
