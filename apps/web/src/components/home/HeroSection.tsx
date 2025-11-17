'use client';

import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToCTA = () => {
    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-graphite via-graphite to-graphite-light">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(196, 154, 108, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, rgba(196, 154, 108, 0.1) 0%, transparent 50%)`
      }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-ivory mb-6 leading-tight">
          Дизайн Эмоций
        </h1>

        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-bronze mb-8 leading-tight">
          Внутреннее состояние —<br className="hidden md:block" />
          решающее преимущество
        </p>

        {/* Декоративная линия */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-0.5 w-32 md:w-48 bg-bronze" />
        </div>

        <p className="text-lg md:text-xl lg:text-2xl text-ivory/80 max-w-4xl mx-auto mb-12 leading-relaxed">
          Персональное сопровождение для лидеров,<br className="hidden md:block" />
          которые опережают конкурентов не бюджетом,<br className="hidden md:block" />
          а качеством своих решений
        </p>

        <Button
          onClick={scrollToCTA}
          size="lg"
          className="bg-midnight hover:bg-midnight-hover text-ivory text-lg px-8 py-6 rounded hover:shadow-xl transition-all hover:-translate-y-1"
        >
          Подать заявку
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-bronze/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-bronze rounded-full" />
        </div>
      </div>
    </section>
  );
}
