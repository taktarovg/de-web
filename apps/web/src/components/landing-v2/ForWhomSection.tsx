import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Heart, TrendingUp, Award } from 'lucide-react';

export function ForWhomSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Инструмент, который работает на вас
            </h2>
            <p className="text-xl text-gray-600">
              Профессиональная работа с эмоциями для специалистов и личного роста
            </p>
          </div>

          {/* 2 колонки */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Для специалистов */}
            <Card className="p-8 hover:shadow-2xl transition-shadow border-2 border-purple-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Для специалистов
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Точная диагностика</span> клиентов 
                      до и после сессии с использованием шкалы Хокинса
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Отслеживание прогресса</span> клиентов 
                      в их личном кабинете с визуальной аналитикой
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Партнерская программа</span> —
                      получайте вознаграждение за рекомендации
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Готовый инструмент</span> для 
                      домашних заданий между сессиями
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Узнать о партнерстве
                <Award className="ml-2 h-5 w-5" />
              </Button>
            </Card>

            {/* Для личного использования */}
            <Card className="p-8 hover:shadow-2xl transition-shadow border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Для личного роста
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Дневник эмоций</span> с историей 
                      и динамикой вашего эмоционального состояния
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Быстрая ясность</span> в сложных 
                      ситуациях за несколько минут
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Управление состоянием</span> —
                      научитесь работать с эмоциями, а не бороться
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">24/7 доступ</span> через 
                      Telegram-бот в любое время и место
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Начать вести дневник
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
