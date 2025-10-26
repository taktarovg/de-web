'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const emotionsData = [
  {
    category: 'Апатия',
    level: 50,
    emoji: '😶',
    color: 'from-slate-400 to-slate-500',
    count: 12,
    emotions: ['Бесчувственность', 'Безразличие', 'Опустошённость', 'Бессилие', 'Отчуждённость', 'Безысходность', 'Беспомощность', 'Замороженность', 'Отрешённость', 'Выгорание', 'Пустота', 'Бездействие'],
  },
  {
    category: 'Печаль',
    level: 75,
    emoji: '😢',
    color: 'from-blue-400 to-blue-500',
    count: 12,
    emotions: ['Грусть', 'Тоска', 'Уныние', 'Скорбь', 'Сожаление', 'Разочарование', 'Горе', 'Меланхолия', 'Жалость', 'Потерянность', 'Ностальгия', 'Угнетённость'],
  },
  {
    category: 'Страх',
    level: 100,
    emoji: '😨',
    color: 'from-coral-400 to-coral-500',
    count: 12,
    emotions: ['Тревога', 'Беспокойство', 'Паника', 'Ужас', 'Опасение', 'Нервозность', 'Испуг', 'Неуверенность', 'Смятение', 'Паранойя', 'Волнение', 'Дрожь'],
  },
  {
    category: 'Вожделение',
    level: 125,
    emoji: '🤤',
    color: 'from-amber-400 to-amber-500',
    count: 12,
    emotions: ['Желание', 'Страсть', 'Жажда', 'Алчность', 'Зависимость', 'Одержимость', 'Вожделение', 'Жадность', 'Алкание', 'Ненасытность', 'Влечение', 'Тяга'],
  },
  {
    category: 'Злость',
    level: 150,
    emoji: '😡',
    color: 'from-red-500 to-coral-500',
    count: 12,
    emotions: ['Гнев', 'Раздражение', 'Ярость', 'Негодование', 'Возмущение', 'Обида', 'Досада', 'Бешенство', 'Агрессия', 'Злость', 'Фрустрация', 'Ненависть'],
  },
  {
    category: 'Гордыня',
    level: 175,
    emoji: '😏',
    color: 'from-rose-400 to-rose-500',
    count: 12,
    emotions: ['Высокомерие', 'Презрение', 'Надменность', 'Самодовольство', 'Пренебрежение', 'Заносчивость', 'Тщеславие', 'Снобизм', 'Чванство', 'Спесь', 'Превосходство', 'Эгоизм'],
  },
  {
    category: 'Мужество',
    level: 200,
    emoji: '💪',
    color: 'from-amber-500 to-amber-600',
    count: 12,
    emotions: ['Решительность', 'Смелость', 'Храбрость', 'Уверенность', 'Стойкость', 'Твёрдость', 'Бесстрашие', 'Отвага', 'Готовность', 'Сила воли', 'Настойчивость', 'Целеустремлённость'],
  },
  {
    category: 'Принятие',
    level: 350,
    emoji: '🤗',
    color: 'from-sage-400 to-sage-500',
    count: 12,
    emotions: ['Понимание', 'Открытость', 'Прощение', 'Терпимость', 'Сострадание', 'Доброта', 'Эмпатия', 'Мягкость', 'Принятие', 'Любовь', 'Благодарность', 'Доверие'],
  },
  {
    category: 'Умиротворение',
    level: 600,
    emoji: '🙏',
    color: 'from-calm-400 to-calm-500',
    count: 12,
    emotions: ['Покой', 'Гармония', 'Блаженство', 'Радость', 'Счастье', 'Безмятежность', 'Спокойствие', 'Восторг', 'Ликование', 'Просветление', 'Единство', 'Благость'],
  },
]

export function EmotionsMapSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-cloud to-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-600 mb-4">
            108 эмоций в 9 категориях
          </h2>
          <p className="text-xl text-ocean-400 max-w-3xl mx-auto">
            Детальная карта эмоциональных состояний для точной идентификации того, что вы чувствуете
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Нажмите на категорию, чтобы увидеть все эмоции
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12">
          {emotionsData.map((category) => {
            const isExpanded = expandedCategory === category.category

            return (
              <Card
                key={category.category}
                className={`cursor-pointer transition-all duration-300 ${
                  isExpanded 
                    ? 'ring-2 ring-calm-500 shadow-lg scale-105' 
                    : 'hover:shadow-md hover:scale-102'
                }`}
                onClick={() => toggleCategory(category.category)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-4xl">{category.emoji}</div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </div>

                  <div className="mb-2">
                    <h3 className="font-semibold text-lg text-ocean-600">
                      {category.category}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Уровень {category.level}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category.color} text-white`}>
                      {category.count} эмоций
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex flex-wrap gap-2">
                        {category.emotions.map((emotion, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 rounded-md text-xs bg-white text-slate-700 border border-slate-200"
                          >
                            {emotion}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Scientific proof */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-calm-50 to-sage-50 border-calm-200">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-ocean-600">
                  Научно доказано: называние эмоций снижает их интенсивность на 30%
                </h3>
                <p className="text-ocean-400 mb-4">
                  Исследование UCLA (2007) показало, что процесс "эмоциональной маркировки" 
                  (называние своих чувств) активирует префронтальную кору и снижает 
                  активность миндалевидного тела, ответственного за эмоциональные реакции.
                </p>
                <p className="text-sm text-slate-500">
                  Lieberman et al., 2007 | "Putting Feelings Into Words"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
