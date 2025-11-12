'use client';

import { LeadFormPopup } from '@/components/lead-form';

interface CTABlockProps {
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  urgency?: string;
  ctaText?: string;
  source: string;
  background?: 'graphite' | 'bronze' | 'ivory';
}

export function CTABlock({
  title,
  subtitle,
  price,
  priceNote = '90 минут онлайн',
  urgency,
  ctaText = 'Записаться на сессию',
  source,
  background = 'graphite',
}: CTABlockProps) {
  const bgClass = {
    graphite: 'bg-graphite',
    bronze: 'bg-bronze',
    ivory: 'bg-ivory',
  }[background];

  const textColor = background === 'ivory' ? 'text-graphite' : 'text-ivory';

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-6`}>
          {title}
        </h2>
        <p className={`text-lg ${textColor}/80 mb-8 leading-relaxed max-w-2xl mx-auto`}>
          {subtitle}
        </p>
        
        <div className="mb-8">
          <p className={`${textColor}/70 mb-2`}>Стоимость:</p>
          <p className="text-4xl font-bold text-bronze mb-2">
            {price}
          </p>
          <p className={`text-sm ${textColor}/60`}>
            {priceNote}
          </p>
        </div>

        <LeadFormPopup 
          source={`${source}-cta`}
          buttonText={ctaText}
          buttonClassName="bg-bronze hover:bg-bronze-dark text-graphite font-semibold px-10 py-4 rounded-lg text-lg transition-all hover:shadow-xl"
        />

        {urgency && (
          <p className="text-bronze text-sm mt-6">
            ⚡ {urgency}
          </p>
        )}
      </div>
    </section>
  );
}
