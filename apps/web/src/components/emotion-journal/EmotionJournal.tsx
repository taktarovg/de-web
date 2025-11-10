'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  getJournalEntries,
  getRecentEntries,
  deleteJournalEntry,
  clearJournal,
  getJournalStats,
  type JournalEntry
} from '@/lib/journal';
import { Trash2, Download, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface EmotionJournalProps {
  days?: number;
  showStats?: boolean;
  className?: string;
}

export function EmotionJournal({ 
  days = 7, 
  showStats = true,
  className = '' 
}: EmotionJournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadData();
  }, [days]);

  const loadData = () => {
    const recentEntries = getRecentEntries(days);
    setEntries(recentEntries);
    
    if (showStats) {
      const journalStats = getJournalStats(days);
      setStats(journalStats);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить эту запись из дневника?')) {
      deleteJournalEntry(id);
      loadData();
    }
  };

  const handleClearAll = () => {
    if (confirm('Удалить все записи из дневника? Это действие нельзя отменить.')) {
      clearJournal();
      loadData();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Сегодня';
    if (days === 1) return 'Вчера';
    if (days < 7) return `${days} дней назад`;
    
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getLevelColor = (level: number) => {
    if (level < 100) return 'text-red-600 bg-red-50';
    if (level < 200) return 'text-orange-600 bg-orange-50';
    if (level < 350) return 'text-yellow-600 bg-yellow-50';
    if (level < 600) return 'text-green-600 bg-green-50';
    return 'text-blue-600 bg-blue-50';
  };

  const getTrendIcon = () => {
    if (!stats) return null;
    if (stats.trend === 'up') return <TrendingUp className="h-5 w-5 text-green-500" />;
    if (stats.trend === 'down') return <TrendingDown className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-gray-500" />;
  };

  if (!isClient) {
    return (
      <div className={className}>
        <p className="text-gray-400">Загрузка...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <Card className={`p-8 text-center ${className}`}>
        <div className="text-6xl mb-4">📔</div>
        <h3 className="text-xl font-semibold mb-2">Ваш дневник пуст</h3>
        <p className="text-gray-600 mb-4">
          Пройдите анализ эмоций, чтобы начать вести дневник
        </p>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {showStats && stats && (
        <Card className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600">Записей</div>
              <div className="text-2xl font-bold">{stats.totalEntries}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Средний уровень</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                {stats.averageLevel}
                {getTrendIcon()}
              </div>
            </div>
            {stats.topEmotion && (
              <div>
                <div className="text-sm text-gray-600">Частая эмоция</div>
                <div className="text-lg font-semibold">
                  {stats.topEmotion.name} ({stats.topEmotion.count})
                </div>
              </div>
            )}
            <div className="flex items-center justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleClearAll}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Очистить
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">
          Записи за последние {days} дней
        </h3>
        
        {entries.map((entry) => (
          <Card key={entry.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{entry.emotion.emoji}</span>
                  <div>
                    <h4 className="font-semibold">{entry.emotion.name}</h4>
                    <p className="text-sm text-gray-600">
                      {formatDate(entry.date)} в {formatTime(entry.date)}
                    </p>
                  </div>
                </div>
                
                {entry.goal && (
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Цель:</span> {entry.goal}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-sm">
                  <span className={`px-3 py-1 rounded-full font-medium ${getLevelColor(entry.hawkinsLevel)}`}>
                    Уровень: {entry.hawkinsLevel}
                  </span>
                  <span className="text-gray-600">
                    {entry.emotion.category}
                  </span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(entry.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">
            Хотите сохранить историю навсегда?
          </h3>
          <p className="text-gray-700 mb-4">
            Создайте аккаунт и получите доступ к полной истории анализов,
            статистике прогресса и персональным рекомендациям.
          </p>
          <div className="flex gap-3 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Создать аккаунт
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const data = entries;
                const json = JSON.stringify(data, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `emotion-journal-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Экспорт данных
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
