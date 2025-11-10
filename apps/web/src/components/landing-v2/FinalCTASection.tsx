'use client';

import { EmotionAnalyzer } from '@/components/emotion-analyzer';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <Sparkles className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Готовы спроектировать свое лучшее состояние?
            </h2>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Ваш первый шаг к эмоциональной ясности уже перед вами
            </p>
          </div>

          

          {/* Подсказка */}
          <div className="mt-8 text-center">
            <p className="text-white text-lg">
              💡 Это займет всего 60 секунд, но может изменить ваш день
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
