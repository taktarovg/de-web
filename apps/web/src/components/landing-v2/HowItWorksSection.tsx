import { Search, Brain, Sparkles, ArrowRight } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: 'Анализ',
      description: 'Точно определите корневую эмоцию из 108 состояний, а не просто симптом. Используем детальный каталог и шкалу Хокинса (20-1000) для объективной оценки.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      number: 2,
      icon: Brain,
      title: 'Осознание',
      description: 'Увидьте скрытую роль или потребность, которая управляет вашим поведением. Метод Седона помогает раскрыть глубинные механизмы эмоциональных реакций.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      number: 3,
      icon: Sparkles,
      title: 'Трансформация',
      description: 'Освободите заблокированную энергию через принятие и прощение. Превратите эмоцию из препятствия в ресурс для достижения ваших целей.',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              От хаоса к ясности за 3 шага
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Проверенная система работы с эмоциями на основе метода Седона 
              и шкалы энергетических уровней сознания
            </p>
          </div>

          {/* 3 шага */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Стрелка между шагами (только на desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-4 z-10">
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}

                {/* Карточка шага */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border-2 border-gray-100 hover:border-gray-200">
                  {/* Номер */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white text-2xl font-bold mb-6 shadow-lg`}>
                    {step.number}
                  </div>

                  {/* Иконка */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${step.bgColor} mb-6`}>
                    <step.icon className={`h-8 w-8 ${step.iconColor}`} />
                  </div>

                  {/* Контент */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Дополнительная информация */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-100">
              <p className="text-lg text-gray-700 max-w-3xl">
                <span className="font-semibold">💡 Метод работает,</span> потому что он не борется с эмоциями, 
                а использует их как компас для понимания ваших истинных потребностей и блокировок. 
                Результат — не подавление, а трансформация.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
