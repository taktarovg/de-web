'use client';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  title?: string;
  items: FAQItem[];
  background?: 'white' | 'ivory' | 'graphite';
}

export function FAQBlock({
  title = 'Частые вопросы',
  items,
  background = 'white',
}: FAQBlockProps) {
  const bgClass = {
    white: 'bg-white',
    ivory: 'bg-ivory',
    graphite: 'bg-graphite',
  }[background];

  const textColor = background === 'graphite' ? 'text-ivory' : 'text-graphite';
  const borderColor = background === 'graphite' ? 'border-ivory/10' : 'border-graphite/10';

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} text-center mb-12`}>
          {title}
        </h2>
        
        <div className="space-y-6">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`border-b ${borderColor} pb-6 last:border-b-0`}
            >
              <h3 className={`text-lg font-semibold ${textColor} mb-3`}>
                {item.question}
              </h3>
              <p className={`${textColor}/70 leading-relaxed`}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
