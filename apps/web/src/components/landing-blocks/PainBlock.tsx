'use client';

import { LeadFormPopup } from '@/components/lead-form';

interface Pain {
  title: string;
  description: string;
}

interface PainBlockProps {
  title?: string;
  subtitle?: string;
  pains: Pain[];
  ctaText?: string;
  ctaButtonText?: string;
  source: string;
  background?: 'ivory' | 'white' | 'graphite';
}

export function PainBlock({
  title = 'Узнаете себя?',
  subtitle = 'Это не просто "стресс". Это реальные боли, которые мешают вам спокойно жить и работать.',
  pains,
  ctaText = 'Узнали хотя бы одну ситуацию?',
  ctaButtonText = 'Хочу разобраться',
  source,
  background = 'ivory',
}: PainBlockProps) {
  const bgClass = {
    ivory: 'bg-ivory',
    white: 'bg-white',
    graphite: 'bg-graphite',
  }[background];

  const textColor = background === 'graphite' ? 'text-ivory' : 'text-graphite';
  const cardBg = background === 'graphite' ? 'bg-white/10' : 'bg-white';

  return (
    <section id="pains" className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} text-center mb-4`}>
          {title}
        </h2>
        <p className={`text-lg ${textColor}/70 text-center mb-12 max-w-2xl mx-auto`}>
          {subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pains.map((pain, index) => (
            <div 
              key={index} 
              className={`p-6 ${cardBg} rounded-lg border-l-4 border-bronze shadow-sm hover:shadow-md transition-shadow`}
            >
              <h3 className="text-lg font-semibold text-bronze mb-3">
                {pain.title}
              </h3>
              <p className={`${background === 'graphite' ? 'text-ivory/80' : 'text-graphite/80'} text-sm leading-relaxed`}>
                {pain.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className={`text-lg ${textColor}/80 mb-6`}>
            {ctaText}
          </p>
          <LeadFormPopup 
            source={`${source}-pains`}
            buttonText={ctaButtonText}
            buttonClassName="bg-bronze hover:bg-bronze-dark text-graphite font-semibold px-8 py-3 rounded-lg transition-all"
          />
        </div>
      </div>
    </section>
  );
}
