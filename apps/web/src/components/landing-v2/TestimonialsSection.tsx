import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Анна Михайлова',
      role: 'Коуч по личностному росту',
      avatar: '👩‍💼',
      text: 'Наконец-то появился инструмент, который объективизирует работу с эмоциями. Мои клиенты видят свой прогресс в цифрах по шкале Хокинса, и это повышает их мотивацию в разы. Использую на каждой сессии.',
      rating: 5
    },
    {
      name: 'Дмитрий Соколов',
      role: 'Предприниматель',
      avatar: '👨‍💻',
      text: 'Я использую анализ эмоций каждое утро перед важными переговорами. Это как почистить зубы, только для ума. Помогает начать день с ясной головой и понять, что действительно важно в текущей ситуации.',
      rating: 5
    },
    {
      name: 'Елена Краснова',
      role: 'Психолог',
      avatar: '👩‍⚕️',
      text: 'Метод Седона в сочетании с детальным каталогом эмоций — это прорыв. Клиенты наконец могут точно назвать, что они чувствуют, вместо размытого "мне плохо". А шкала Хокинса дает объективные измерения прогресса.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Нам доверяют профессионалы
            </h2>
            <p className="text-xl text-gray-600">
              Более 70 специалистов и их клиентов используют наш метод ежедневно
            </p>
          </div>

          {/* Отзывы */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="p-8 hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200 relative overflow-hidden"
              >
                {/* Декоративная иконка цитаты */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-20 w-20 text-purple-600" />
                </div>

                {/* Рейтинг */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Текст отзыва */}
                <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Автор */}
                <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                  <div className="text-4xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Статистика */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">70+</div>
              <div className="text-sm text-gray-600">Активных пользователей</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-sm text-gray-600">Анализов проведено</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">108</div>
              <div className="text-sm text-gray-600">Эмоций в каталоге</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Доступ к инструменту</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
