'use client';

import { Shield } from 'lucide-react';

interface GuaranteeBlockProps {
  title?: string;
  description: string;
  highlight?: string;
  background?: 'ivory' | 'white' | 'graphite';
  icon?: React.ReactNode;
}

export function GuaranteeBlock({
  title = 'Гарантия результата',
  description,
  highlight,
  background = 'ivory',
  icon,
}: GuaranteeBlockProps) {
  const bgClass = {
    ivory: 'bg-ivory',
    white: 'bg-white',
    graphite: 'bg-graphite',
  }[background];

  const cardBg = background === 'graphite' ? 'bg-white/10' : 'bg-white';
  const textColor = background === 'graphite' ? 'text-ivory' : 'text-graphite';

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className={`p-8 ${cardBg} rounded-xl border-2 border-bronze/30 shadow-lg`}>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-bronze/20 rounded-full flex items-center justify-center shrink-0">
              {icon || <Shield className="w-6 h-6 text-bronze" />}
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${textColor} mb-3`}>
                {title}
              </h3>
              <p className={`${textColor}/80 leading-relaxed mb-4`}>
                {description}
              </p>
              {highlight && (
                <p className="text-bronze font-semibold">
                  {highlight}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
