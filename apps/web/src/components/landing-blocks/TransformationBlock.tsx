'use client';

import { ArrowRight } from 'lucide-react';

interface Transformation {
  before: string;
  after: string;
}

interface TransformationBlockProps {
  title?: string;
  subtitle?: string;
  transformations: Transformation[];
  finalMessage: string;
  background?: 'ivory' | 'white' | 'graphite';
}

export function TransformationBlock({
  title = 'Эффект домино',
  subtitle = 'Архитектура вашего внутреннего мира едина. Принципы, которые мы внедряем в одной сфере, неизбежно меняют другие.',
  transformations,
  finalMessage,
  background = 'ivory',
}: TransformationBlockProps) {
  const bgClass = {
    ivory: 'bg-ivory',
    white: 'bg-white',
    graphite: 'bg-graphite',
  }[background];

  const textColor = background === 'graphite' ? 'text-ivory' : 'text-graphite';
  const cardBg = background === 'graphite' ? 'bg-white/10' : 'bg-white';

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} text-center mb-6`}>
          {title}
        </h2>
        <p className={`text-lg ${textColor}/70 text-center mb-12 max-w-3xl mx-auto leading-relaxed`}>
          {subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {transformations.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-4 p-6 ${cardBg} rounded-lg border border-bronze/20`}
            >
              <ArrowRight className="w-6 h-6 text-bronze shrink-0 mt-1" />
              <div>
                <p className={`${textColor}/60 text-sm mb-2`}>В работе:</p>
                <p className={`${textColor} font-medium mb-3`}>{item.before}</p>
                <p className={`${textColor}/60 text-sm mb-2`}>В жизни:</p>
                <p className="text-bronze">{item.after}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-graphite rounded-lg text-center">
          <p className="text-xl md:text-2xl text-ivory font-semibold">
            {finalMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
