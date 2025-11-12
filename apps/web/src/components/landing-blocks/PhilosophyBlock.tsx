'use client';

interface PhilosophyBlockProps {
  title: string;
  paragraphs: string[];
  highlight?: {
    title: string;
    text: string;
  };
  background?: 'graphite' | 'ivory' | 'white';
}

export function PhilosophyBlock({
  title,
  paragraphs,
  highlight,
  background = 'graphite',
}: PhilosophyBlockProps) {
  const bgClass = {
    graphite: 'bg-graphite',
    ivory: 'bg-ivory',
    white: 'bg-white',
  }[background];

  const textColor = background === 'graphite' ? 'text-ivory' : 'text-graphite';

  return (
    <section id="philosophy" className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} text-center mb-12`}>
          {title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h2>

        <div className={`space-y-6 ${textColor}/90 leading-relaxed`}>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg">
              {paragraph}
            </p>
          ))}

          {highlight && (
            <div className="p-6 bg-bronze/10 rounded-lg border border-bronze/30">
              <p className="text-lg font-medium text-bronze mb-3">
                {highlight.title}
              </p>
              <p className={textColor}>
                {highlight.text}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
