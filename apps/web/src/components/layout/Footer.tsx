import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-graphite-dark py-12 border-t border-bronze/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Копирайт */}
          <div className="text-ivory/60 text-sm text-center md:text-left">
            <p>© 2025 Георгий Тактаров. Design Emotion</p>
          </div>

          {/* Ссылки */}
          <div className="flex items-center gap-6 text-sm">
            <Link 
              href="/legal/privacy" 
              className="text-ivory/60 hover:text-ivory transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link 
              href="/legal/terms" 
              className="text-ivory/60 hover:text-ivory transition-colors"
            >
              Условия использования
            </Link>
          </div>
        </div>

        {/* Блок "Мост" */}
        <div className="mt-8 pt-8 border-t border-bronze/10 text-center">
          <p className="text-ivory/80 text-sm mb-2">
            Моя открытая методология и инструменты:
          </p>
          <Link 
            href="https://diaryofemotions.ru" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-bronze hover:text-bronze-light transition-colors"
          >
            <span className="text-lg">→</span>
            <span className="font-medium">diaryofemotions.ru</span>
          </Link>
          <p className="text-ivory/50 text-xs mt-2">
            Бесплатный дневник эмоций и анализатор для самостоятельной работы
          </p>
        </div>
      </div>
    </footer>
  );
}
