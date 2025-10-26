import { Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const sedonaSteps = [
  {
    number: 1,
    title: 'Ситуация',
    description: 'Что произошло? Опишите событие объективно, без оценок.',
    example: 'Начальник повысил голос на планерке',
  },
  {
    number: 2,
    title: 'Эмоция',
    description: 'Что вы чувствуете? Найдите точное название из 108 эмоций.',
    example: 'Стыд (уровень 30) и злость (уровень 150)',
  },
  {
    number: 3,
    title: 'Желание',
    description: 'Чего вы хотите в этой ситуации? Какая у вас потребность?',
    example: 'Хочу, чтобы меня уважали и ценили мой вклад',
  },
  {
    number: 4,
    title: 'Сопротивление',
    description: 'Что мешает отпустить эмоцию? В чём вы держитесь за неё?',
    example: 'Боюсь потерять уважение коллег если промолчу',
  },
  {
    number: 5,
    title: 'Роль',
    description: 'Какую роль вы играете? "Жертва", "Спаситель", "Преследователь"?',
    example: 'Играю роль "жертвы" - беспомощного сотрудника',
  },
  {
    number: 6,
    title: 'Базовая потребность',
    description: 'Что стоит за желанием? Безопасность? Любовь? Признание?',
    example: 'Потребность в безопасности и признании',
  },
  {
    number: 7,
    title: 'Претензии',
    description: 'На кого/что вы злитесь? Кого обвиняете? Чего требуете?',
    example: 'Злюсь на начальника за неуважение, на себя за слабость',
  },
  {
    number: 8,
    title: 'Благодарность',
    description: 'За что в этой ситуации можно быть благодарным? Какой урок она даёт?',
    example: 'Благодарен за понимание своих границ и потребностей',
  },
]

const stats = [
  { value: '15-25 мин', label: 'Длительность сессии' },
  { value: '2-3 раза', label: 'В неделю для результата' },
  { value: '30+ исследований', label: 'Подтверждают эффективность' },
]

export function MethodSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-600 mb-4">
            8-шаговый метод Седона
          </h2>
          <p className="text-xl text-ocean-400 max-w-3xl mx-auto">
            Проверенная система трансформации эмоций через осознанность и принятие. 
            Бот проведёт вас через каждый шаг.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto mb-16">
          {/* Left: Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-calm-200 via-sage-200 to-ocean-200" />

            <div className="space-y-8">
              {sedonaSteps.map((step, index) => (
                <div key={step.number} className="relative flex gap-6">
                  {/* Step number circle */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-calm-500 to-sage-500 flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold text-ocean-600 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-ocean-400 mb-3 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="bg-cloud rounded-lg p-3 border-l-4 border-calm-500">
                      <p className="text-sm text-ocean-500">
                        <span className="font-medium">Пример:</span> {step.example}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Benefits & Stats */}
          <div className="space-y-6">
            <Card className="border-2 border-sage-200 bg-sage-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-ocean-600 mb-4">
                  Что вы получаете:
                </h3>
                <div className="space-y-3">
                  {[
                    'Снижение интенсивности эмоций на 40-60%',
                    'Понимание истинных причин реакций',
                    'Освобождение от эмоциональных зависимостей',
                    'Повышение уровня сознания по шкале Хокинса',
                    'Улучшение отношений с собой и окружающими',
                    'Навык самостоятельной работы с любыми эмоциями',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-sage-600 flex-shrink-0 mt-0.5" />
                      <span className="text-ocean-500">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-ocean-600 mb-4">
                  Как это работает:
                </h3>
                <p className="text-ocean-400 mb-4 leading-relaxed">
                  Метод Седона основан на принципе <span className="font-semibold text-ocean-600">осознанного принятия</span>. 
                  Вместо подавления или анализа эмоций, вы учитесь их замечать, называть 
                  и отпускать через понимание их природы.
                </p>
                <p className="text-ocean-400 leading-relaxed">
                  Бот задаёт правильные вопросы в правильном порядке, помогая вам 
                  самостоятельно прийти к инсайтам и освобождению от негативных состояний.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gradient-to-br from-cloud to-slate-100 rounded-xl border border-slate-200"
                >
                  <div className="text-2xl font-bold text-ocean-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-ocean-400 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-ocean-400 mb-2">
            Метод разработан <span className="font-semibold text-ocean-600">Hale Dwoskin</span>, 
            автор бестселлера "The Sedona Method"
          </p>
          <p className="text-sm text-slate-500">
            Используется психологами, коучами и миллионами людей по всему миру
          </p>
        </div>
      </div>
    </section>
  )
}
