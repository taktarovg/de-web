import { Star, TrendingUp, Users, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Анна, 32',
    role: 'Мама двоих детей',
    avatar: '👩',
    rating: 5,
    before: 'Постоянно срывалась на детей',
    after: 'Научилась замечать злость до срыва',
    result: '-70% конфликтов за месяц',
    quote: 'Бот помог мне понять, что за злостью скрывается усталость и потребность в поддержке. Теперь я прошу о помощи вместо того, чтобы взрываться.',
    level: { from: 150, to: 310 },
  },
  {
    name: 'Максим, 28',
    role: 'Предприниматель',
    avatar: '👨',
    rating: 5,
    before: 'Прокрастинировал из-за страха',
    after: 'Действую несмотря на страх',
    result: 'Запустил 2 новых проекта',
    quote: 'Раньше я избегал важных решений, оправдывая это "недостатком информации". Метод Седона показал, что это просто страх неудачи. Теперь я действую.',
    level: { from: 100, to: 200 },
  },
  {
    name: 'Елена, 45',
    role: 'HR-директор',
    avatar: '👩‍💼',
    rating: 5,
    before: 'Эмоциональное выгорание',
    after: 'Вернулась энергия и радость',
    result: '+200% уровень энергии',
    quote: 'После 3 месяцев работы с ботом я впервые за год почувствовала, что ХОЧУ идти на работу. Научилась отделять свои эмоции от чужих и ставить границы.',
    level: { from: 50, to: 350 },
  },
]

const stats = [
  { icon: Users, value: '500+', label: 'Активных пользователей' },
  { icon: TrendingUp, value: '10,000+', label: 'Проведённых анализов' },
  { icon: Star, value: '4.9/5', label: 'Средняя оценка' },
  { icon: Award, value: '87%', label: 'Повысили уровень' },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Истории наших пользователей
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Реальные люди, реальные результаты, реальные трансформации
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 hover:border-rose-200 transition-colors">
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-rose-600" />
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((item, index) => (
            <Card key={index} className="border-2 hover:border-rose-200 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{item.avatar}</div>
                    <div>
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-sm text-slate-600">{item.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Before/After */}
                <div className="mb-4 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg">
                  <div className="text-xs font-medium text-red-600 mb-1">До:</div>
                  <div className="text-sm text-slate-700">{item.before}</div>
                </div>

                <div className="mb-4 p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg">
                  <div className="text-xs font-medium text-green-600 mb-1">После:</div>
                  <div className="text-sm text-slate-700">{item.after}</div>
                </div>

                {/* Result */}
                <div className="mb-4 text-center">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-purple-600 text-white text-sm font-medium">
                    {item.result}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-slate-600 leading-relaxed mb-4 italic">
                  "{item.quote}"
                </blockquote>

                {/* Level change */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Уровень:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 font-medium">{item.level.from}</span>
                      <span className="text-slate-400">→</span>
                      <span className="text-green-600 font-bold">{item.level.to}</span>
                      <span className="text-green-600 text-xs">
                        (+{item.level.to - item.level.from})
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-2">
            <span className="font-semibold text-slate-900">95% пользователей</span> рекомендуют бота друзьям
          </p>
          <p className="text-sm text-slate-500">
            * Имена изменены для защиты конфиденциальности
          </p>
        </div>
      </div>
    </section>
  )
}
