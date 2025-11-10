import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function CreatorSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 md:p-12 border-2 border-purple-100 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Фото и основная информация */}
              <div className="text-center md:text-left">
                {/* Placeholder для фото - замените на реальное фото */}
                <div className="w-48 h-48 mx-auto md:mx-0 mb-6 bg-gradient-to-br from-purple-400 to-blue-400 rounded-3xl flex items-center justify-center text-white text-6xl font-bold shadow-xl">
                  ГТ
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">
                  Георгий Тактаров
                </h3>
                <p className="text-xl text-purple-600 font-semibold mb-4">
                  Дизайнер Эмоций
                </p>
                <div className="flex gap-3 justify-center md:justify-start">
                  <a 
                    href="https://t.me/taktarov" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Telegram
                    </Button>
                  </a>
                  <a href="mailto:hello@designemotion.ru">
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </a>
                </div>
              </div>

              {/* Описание */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Ваш проводник в мир эмоций
                </h2>
                
                <p className="text-gray-700 leading-relaxed">
                  Более 5 лет я помогаю людям не бороться с эмоциями, 
                  а <span className="font-semibold text-purple-600">проектировать</span> их. 
                  Как архитектор создает здание, так и вы можете создавать 
                  свое эмоциональное состояние.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Я объединил метод Седона, шкалу Хокинса и детальный каталог 
                  из 108 эмоций в единую систему, которая работает как навигатор 
                  для вашего внутреннего мира.
                </p>

                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-100">
                  <p className="text-gray-700 italic">
                    "Эмоция — это не враг. Это сигнальная ракета, 
                    указывающая на ваши истинные потребности и ценности. 
                    Научитесь читать эти сигналы."
                  </p>
                </div>

                <div className="pt-4">
                  <Link href="/taktarov">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                      Узнать больше о методе
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
