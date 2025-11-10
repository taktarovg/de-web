'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { BookingModal } from '@/components/booking';

export default function ProgramSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSessionType, setSelectedSessionType] = useState<'single' | 'quarter' | 'year'>('single');

  const openBookingModal = (type: 'single' | 'quarter' | 'year') => {
    setSelectedSessionType(type);
    setIsBookingModalOpen(true);
  };

  const plans = [
    {
      title: 'Один Дизайн Эмоций',
      price: '10 000',
      duration: '60-90 минут',
      description: 'Глубокая проработка одной конкретной ситуации или решения. За одну сессию мы пройдем полный цикл от эмоционального хаоса до стратегической ясности.',
      features: [
        '90-минутная персональная сессия онлайн',
        'Глубокий анализ эмоционального состояния',
        'Протокол отделения эго от стратегических интересов',
        'Конкретный план действий на выходе'
      ],
      forWhom: 'Для лидеров, которые столкнулись с конкретной сложной ситуацией и хотят принять верное решение.',
      cta: 'Записаться',
      type: 'single' as const,
      featured: false
    },
    {
      title: 'Квартальное сопровождение',
      price: '60 000',
      duration: '3 месяца | 9 сессий',
      description: 'Системная работа над ключевыми бизнес-задачами и личной эффективностью. 3 сессии в месяц + доступ для экстренных вопросов между встречами.',
      features: [
        '9 персональных сессий по 90 минут',
        'Личный доступ для калибровки в моменте',
        'Персональная аналитическая платформа',
        'Итоговый отчет о трансформации'
      ],
      forWhom: 'Для лидеров, которые готовы к глубокой трансформации своего подхода к принятию решений и управлению командой.',
      cta: 'Подать заявку',
      type: 'quarter' as const,
      featured: false
    },
    {
      title: 'Год трансформации',
      price: '120 000',
      duration: '12 месяцев | 24 сессии',
      badge: 'ФЛАГМАНСКАЯ ПРОГРАММА',
      description: 'Полное переосмысление вашего внутреннего мира и стратегии принятия решений. 2 сессии в месяц + круглосуточная поддержка для важных моментов.',
      features: [
        '24 персональные сессии по 90 минут',
        'Поддержка 24/7 в мессенджере',
        'Доступ к закрытому клубу выпускников',
        'Итоговая стратегическая сессия с семьей/командой'
      ],
      forWhom: 'Для лидеров, которые строят не просто бизнес, а наследие, и понимают, что главная инвестиция — это они сами.',
      cta: 'Подать заявку',
      type: 'year' as const,
      featured: true
    }
  ];

  return (
    <>
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite mb-4">
              Персональная программа по Дизайну Эмоций
            </h2>
            <p className="text-lg text-graphite/70 max-w-2xl mx-auto">
              Выберите формат работы, который соответствует вашим целям
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-lg p-8 border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                  plan.featured ? 'border-bronze shadow-lg' : 'border-graphite/10'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bronze text-graphite text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </div>
                )}

                <h3 className="text-2xl font-semibold text-graphite mb-2">
                  {plan.title}
                </h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-bronze">{plan.price} ₽</span>
                </div>

                <p className="text-sm text-graphite/60 mb-4">{plan.duration}</p>

                <p className="text-graphite/80 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-bronze shrink-0 mt-0.5" />
                      <span className="text-sm text-graphite/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6 p-4 bg-ivory rounded border border-bronze/20">
                  <p className="text-sm text-graphite/70 leading-relaxed">
                    <span className="font-semibold text-graphite">Для кого:</span> {plan.forWhom}
                  </p>
                </div>

                <Button
                  onClick={() => openBookingModal(plan.type)}
                  className={`w-full ${
                    plan.featured
                      ? 'bg-bronze hover:bg-bronze-dark text-white'
                      : 'bg-midnight hover:bg-midnight-hover text-ivory'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно бронирования */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        defaultSessionType={selectedSessionType}
      />
    </>
  );
}
