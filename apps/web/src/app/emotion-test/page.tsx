'use client';

import { EmotionAnalyzer } from '@/components/emotion-analyzer';

export default function EmotionTestPage() {
  const handleComplete = (result: any) => {
    console.log('Analysis complete:', result);
    // Здесь можно добавить analytics
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(12345678, 'reachGoal', 'emotion_analysis_complete');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🧠 Нейропсихологический анализ</h1>
          <p className="text-xl text-gray-600">
            Узнайте, какая эмоция блокирует достижение вашей цели
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <EmotionAnalyzer
            context="landing"
            onComplete={handleComplete}
          />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Ваши данные защищены и обрабатываются в соответствии с политикой конфиденциальности</p>
        </div>
      </div>
    </div>
  );
}
