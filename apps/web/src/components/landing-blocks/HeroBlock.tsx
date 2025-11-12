'use client';

import { LeadFormPopup } from '@/components/lead-form';
import { CheckCircle2 } from 'lucide-react';

interface HeroBlockProps {
  targeting: string;
  headline: string;
  subheadline: string;
  results: string[];
  price: string;
  priceNote?: string;
  urgency?: string;
  ctaText?: string;
  source: string;
  stats?: Array<{ label: string; value: string }>;
  background?: 'graphite' | 'ivory' | 'gradient';
}

export function HeroBlock({
  targeting,
  headline,
  subheadline,
  results,
  price,
  priceNote = '90 минут онлайн (Zoom) • Москва и СПб',
  urgency,
  ctaText = 'Записаться на сессию',
  source,
  stats,
  background = 'gradient',
}: HeroBlockProps) {
  const bgClass = {
    graphite: 'bg-graphite',
    ivory: 'bg-ivory',
    gradient: 'bg-gradient-to-br from-graphite via-graphite-dark to-graphite',
  }[background];

  const textColor = background === 'ivory' ? 'text-graphite' : 'text-ivory';

  return (
    <section className={`min-h-screen flex items-center justify-center ${bgClass} relative`}>
      {/* Декоративный фон */}
      {background === 'gradient' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-b from-bronze/20 to-transparent" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Таргетинг */}
          <p className="text-bronze text-sm uppercase tracking-wider mb-6 text-center">
            {targeting}
          </p>

          {/* Заголовок */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${textColor} mb-6 text-center leading-tight`}>
            {headline}
          </h1>

          {/* Подзаголовок */}
          <p className={`text-xl md:text-2xl ${textColor}/80 mb-12 text-center leading-relaxed max-w-3xl mx-auto`}>
            {subheadline}
          </p>

          {/* Результаты */}
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl mb-8 border border-bronze/20">
            <h3 className="font-semibold text-graphite mb-6 text-center text-lg">
              После сессии вы получите:
            </h3>
            <ul className="space-y-4">
              {results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-bronze shrink-0 mt-0.5" />
                  <span className="text-graphite/90 leading-relaxed">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Цена + CTA */}
          <div className="text-center">
            <p className={`${textColor}/70 mb-2`}>
              Стоимость сессии:
            </p>
            <p className="text-4xl md:text-5xl font-bold text-bronze mb-2">
              {price}
            </p>
            <p className={`text-sm ${textColor}/60 mb-8`}>
              {priceNote}
            </p>
            
            <LeadFormPopup 
              source={`${source}-hero`}
              buttonText={ctaText}
              buttonClassName="bg-bronze hover:bg-bronze-dark text-graphite font-semibold px-10 py-5 rounded-lg text-xl transition-all hover:shadow-2xl"
            />
            
            {urgency && (
              <p className="text-bronze text-sm mt-6 font-medium">
                ⚡ {urgency}
              </p>
            )}
          </div>

          {/* Статистика (опционально) */}
          {stats && (
            <div className="mt-12 flex items-center justify-center gap-8 flex-wrap text-sm">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-bronze" />
                  <span className={`${textColor}/60`}>
                    <strong className={textColor}>{stat.value}</strong> {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
