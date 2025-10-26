import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const transformations = [
  {
    before: {
      emoji: '😡',
      level: 150,
      name: 'Злость',
      text: 'Срываюсь на близких из-за мелочей',
    },
    after: {
      emoji: '💪',
      level: 200,
      name: 'Мужество',
      text: 'Контролирую реакции, говорю спокойно',
    },
    stats: '+50 уровней за 14 дней',
  },
  {
    before: {
      emoji: '😨',
      level: 100,
      name: 'Страх',
      text: 'Избегаю важных разговоров и решений',
    },
    after: {
      emoji: '💪',
      level: 200,
      name: 'Мужество',
      text: 'Действую несмотря на страх',
    },
    stats: '+100 уровней за 21 день',
  },
  {
    before: {
      emoji: '😶',
      level: 50,
      name: 'Апатия',
      text: 'Ничего не хочется, нет энергии',
    },
    after: {
      emoji: '🤗',
      level: 350,
      name: 'Принятие',
      text: 'Вернулась энергия и интерес к жизни',
    },
    stats: '+300 уровней за 30 дней',
  },
  {
    before: {
      emoji: '😢',
      level: 75,
      name: 'Печаль',
      text: 'Не понимаю, что со мной происходит',
    },
    after: {
      emoji: '🤗',
      level: 350,
      name: 'Принятие',
      text: 'Знаю свои эмоции и работаю с ними',
    },
    stats: '+275 уровней за 30 дней',
  },
]

export function ResultsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-600 mb-4">
            Реальные трансформации за 14-30 дней
          </h2>
          <p className="text-xl text-ocean-400 max-w-3xl mx-auto">
            Пользователи бота повышают свой уровень сознания и улучшают качество жизни
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {transformations.map((item, index) => (
            <Card key={index} className="border-2 hover:border-calm-200 transition-colors hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  {/* Before */}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500 mb-2">До</div>
                    <div className="text-4xl mb-2">{item.before.emoji}</div>
                    <div className="font-semibold text-ocean-600 mb-1">
                      {item.before.name}
                    </div>
                    <div className="text-sm text-slate-500 mb-2">
                      Уровень {item.before.level}
                    </div>
                    <p className="text-sm text-ocean-400 leading-relaxed">
                      "{item.before.text}"
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center pt-8">
                    <ArrowRight className="h-6 w-6 text-calm-500" />
                  </div>

                  {/* After */}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-sage-600 mb-2">После</div>
                    <div className="text-4xl mb-2">{item.after.emoji}</div>
                    <div className="font-semibold text-ocean-600 mb-1">
                      {item.after.name}
                    </div>
                    <div className="text-sm text-slate-500 mb-2">
                      Уровень {item.after.level}
                    </div>
                    <p className="text-sm text-ocean-400 leading-relaxed">
                      "{item.after.text}"
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-sage-100 text-sage-700 font-medium">
                      {item.stats}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-ocean-400 mb-4">
            Основано на данных <span className="font-semibold text-ocean-600">500+ пользователей</span> бота
          </p>
          <p className="text-sm text-slate-500">
            * Результаты индивидуальны и зависят от регулярности практики
          </p>
        </div>
      </div>
    </section>
  )
}
