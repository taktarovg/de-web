'use client';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { addJournalEntry } from '@/lib/journal';
import { BookMarked } from 'lucide-react';

interface Category { id: string; name: string; emoji: string; level: number; }
interface Emotion { id: string; name: string; category: string; level: number; emoji: string; }
interface AnalysisResult { emotion: Emotion; goal: string; headline: string; problem: string; insights: string[]; hawkinsLevel: number; }
type Step = 'goal' | 'categories' | 'emotions' | 'analyzing' | 'results';

export function EmotionAnalyzer({ context = 'landing', userId, onComplete, className = '' }: any) {
  const [currentStep, setCurrentStep] = useState<Step>('goal');
  const [goalText, setGoalText] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [savedToJournal, setSavedToJournal] = useState(false);

  useEffect(() => { loadCategories(); }, []);

  const loadCategories = async () => {
    const res = await fetch('/api/emotions/categories');
    const data = await res.json();
    if (data.success) setCategories(data.data);
  };

  const loadEmotions = async (cat: string) => {
    const res = await fetch(`/api/emotions/by-category/${cat.toLowerCase()}`);
    const data = await res.json();
    if (data.success) setEmotions(data.data);
  };

  const handleGoalSubmit = () => {
    if (!goalText.trim()) { 
      alert('💡 Пожалуйста, опишите ситуацию или цель в нескольких словах'); 
      return; 
    }
    if (goalText.length < 10) {
      alert('💡 Опишите подробнее (минимум 10 символов)');
      return;
    }
    if (goalText.length > 500) {
      alert('⚠️ Слишком длинный текст (максимум 500 символов)');
      return;
    }
    setCurrentStep('categories');
  };

  const handleCategorySelect = async (cat: Category) => {
    setSelectedCategory(cat);
    await loadEmotions(cat.name);
    setCurrentStep('emotions');
  };

  const handleEmotionSelect = async (emo: Emotion) => {
    setCurrentStep('analyzing');
    const res = await fetch('/api/emotions/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, emotionId: emo.id, goal: goalText, context })
    });
    const data = await res.json();
    if (data.success) {
      setResult(data.data);
      if (onComplete) onComplete(data.data);
      setCurrentStep('results');
    }
  };

  const progress = currentStep === 'goal' ? 20 : currentStep === 'categories' ? 40 : currentStep === 'emotions' ? 60 : currentStep === 'analyzing' ? 80 : 100;

  return (
    <div className={className}>
      <div className="mb-6 h-2 bg-gray-200 rounded-full">
        <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {currentStep === 'goal' && (
        <div className="space-y-8">
          {/* Заголовок - более вовлекающий */}
          <div className="text-center space-y-4">
            <div className="text-5xl mb-2">🎯</div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Что у вас сейчас на уме?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Опишите ситуацию или цель в нескольких словах. Это поможет точнее определить вашу эмоцию.
            </p>
          </div>

          {/* Textarea с улучшенным placeholder */}
          <div className="relative">
            <textarea
              value={goalText}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 500) {
                  setGoalText(value);
                }
              }}
              placeholder="Например:\n• Ссора с близким человеком\n• Сдать важный проект вовремя\n• Хочу увеличить свой доход\n• Начать новое дело\n• Разобраться в отношениях"
              className="w-full min-h-[160px] p-6 text-lg border-2 border-gray-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleGoalSubmit();
                }
              }}
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-400">
              {goalText.length} / 500 символов
            </div>
          </div>

          {/* Большая кнопка "Начать Анализ" */}
          <div className="text-center">
            <Button 
              onClick={handleGoalSubmit} 
              size="lg"
              className="px-12 py-8 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="mr-3">✨</span>
              Начать Анализ
              <span className="ml-3">→</span>
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              💡 Совет: Cmd+Enter для быстрого перехода
            </p>
          </div>
        </div>
      )}

      {currentStep === 'categories' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Что вы чувствуете?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map(cat => (
              <Card key={cat.id} className="p-6 cursor-pointer hover:shadow-lg text-center" onClick={() => handleCategorySelect(cat)}>
                <div className="text-5xl mb-3">{cat.emoji}</div>
                <h3 className="font-bold">{cat.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentStep === 'emotions' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Выберите эмоцию</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {emotions.map(emo => (
              <Card key={emo.id} className="p-4 cursor-pointer hover:shadow text-center" onClick={() => handleEmotionSelect(emo)}>
                <div className="text-3xl mb-2">{emo.emoji}</div>
                <h3 className="text-sm font-semibold">{emo.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentStep === 'analyzing' && (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto" />
          <h2 className="text-2xl font-bold mt-6">Анализируем...</h2>
        </div>
      )}

      {currentStep === 'results' && result && (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{result.emotion.emoji}</span>
              <span className="text-xl font-bold">{result.emotion.name}</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">{result.headline}</h2>
            <p className="text-gray-700">{result.problem}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">💡 Метод Седона поможет:</h3>
            <ul className="space-y-3">
              {result.insights.map((insight, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-purple-500 font-bold">✓</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </Card>
          {/* Кнопка "Сохранить в дневник" */}
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">📔 Сохранить результат в дневник</h3>
              <p className="text-sm text-gray-700 mb-4">
                Возвращайтесь завтра, чтобы отследить динамику эмоционального состояния
              </p>
              
              {!savedToJournal ? (
                <Button 
                  size="lg" 
                  className="w-full md:w-auto"
                  onClick={() => {
                    try {
                      addJournalEntry({
                        emotion: result.emotion,
                        goal: goalText,
                        hawkinsLevel: result.hawkinsLevel,
                        analysisId: result.analysisId
                      });
                      setSavedToJournal(true);
                    } catch (error) {
                      alert('Ошибка сохранения. Проверьте настройки браузера.');
                    }
                  }}
                >
                  <BookMarked className="h-5 w-5 mr-2" />
                  Сохранить в дневник
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold">Запись сохранена!</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Возвращайтесь завтра для отслеживания динамики.
                  </p>
                  {!userId && (
                    <p className="text-sm text-purple-700 font-medium">
                      💡 Хотите сохранить историю навсегда? Создайте аккаунт!
                    </p>
                  )}
                </div>
              )}
            </div>
          </Card>
          
          {context === 'landing' && (
            <div className="text-center">
              <Button size="lg" className="px-12 py-6">Забронировать сессию</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
