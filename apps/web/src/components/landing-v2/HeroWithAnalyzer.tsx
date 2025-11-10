'use client';

import { EmotionAnalyzer } from '@/components/emotion-analyzer';
import { Card } from '@/components/ui/card';

export function HeroWithAnalyzer() {
  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Узнайте, какая эмоция управляет вами прямо сейчас
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Пройдите быстрый анализ по методу "Дизайн Эмоций" 
              и получите первый шаг к ясности за 60 секунд
            </p>
          </div>

          {/* Виджет */}
          <Card className="p-8 md:p-12 shadow-2xl border-2 border-purple-100">
            <EmotionAnalyzer 
              context="landing"
              onComplete={(result) => {
                console.log('Analysis completed:', result);
              }}
            />
          </Card>

          {/* Подсказка */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ✨ Анонимно • 🔒 Безопасно • ⚡ Мгновенно
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
