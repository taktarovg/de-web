import { EmotionJournal } from '@/components/emotion-journal';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Мой дневник эмоций | Design Emotions',
  description: 'История ваших эмоциональных анализов и динамика прогресса'
};

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-calm-500" />
            <span className="font-bold text-xl text-ocean-500">Дизайн Эмоций</span>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="border-calm-500 text-calm-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-calm-500 via-sage-500 to-ocean-500 bg-clip-text text-transparent">
            📔 Мой дневник эмоций
          </h1>
          <p className="text-xl text-ocean-400">
            История ваших эмоциональных состояний и динамика прогресса
          </p>
        </div>

        <EmotionJournal days={7} showStats={true} />

        {/* Information */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">💡 О дневнике</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span>•</span>
              <span>Записи хранятся локально в вашем браузере</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Максимум 30 последних записей</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Создайте аккаунт для постоянного хранения и расширенной аналитики</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Вы можете экспортировать данные в любой момент</span>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 mt-12 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 ИП Тактаров Георгий Викторович. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
