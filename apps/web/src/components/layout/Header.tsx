'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-graphite/90 backdrop-blur-md border-b border-bronze/20">
      <nav className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Логотип */}
        <Link 
          href="/" 
          className="text-xl font-semibold text-bronze tracking-wide hover:text-bronze-light transition-colors"
        >
          Дизайн Эмоций
        </Link>

        {/* Меню Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('cases')}
            className="text-ivory/80 hover:text-ivory transition-colors"
          >
            Кейсы
          </button>

          <Button
            onClick={() => scrollToSection('cta')}
            className="bg-midnight hover:bg-midnight-hover text-ivory px-6 py-2 rounded transition-all hover:shadow-lg"
          >
            Подать заявку
          </Button>
        </div>

        {/* Меню Mobile */}
        <Button
          onClick={() => scrollToSection('cta')}
          size="sm"
          className="md:hidden bg-midnight hover:bg-midnight-hover text-ivory"
        >
          Заявка
        </Button>
      </nav>
    </header>
  );
}
