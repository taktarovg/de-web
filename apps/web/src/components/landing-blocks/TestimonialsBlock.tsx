'use client';

interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatar?: string;
}

interface TestimonialsBlockProps {
  title?: string;
  testimonials: Testimonial[];
  background?: 'white' | 'ivory' | 'graphite';
  columns?: 1 | 2 | 3;
}

export function TestimonialsBlock({
  title = 'Что говорят клиенты',
  testimonials,
  background = 'white',
  columns = 2,
}: TestimonialsBlockProps) {
  const bgClass = {
    white: 'bg-white',
    ivory: 'bg-ivory',
    graphite: 'bg-graphite',
  }[background];

  const textColor = background === 'graphite' ? 'text-ivory' : 'text-graphite';
  const cardBg = background === 'graphite' ? 'bg-white/10' : 'bg-ivory';

  const gridCols = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
  }[columns];

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} text-center mb-12`}>
          {title}
        </h2>
        
        <div className={`grid ${gridCols} gap-8`}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`p-8 ${cardBg} rounded-lg border border-bronze/20 hover:border-bronze/40 transition-colors`}
            >
              <p className={`${background === 'graphite' ? 'text-ivory/90' : 'text-graphite/90'} italic mb-6 leading-relaxed`}>
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                {testimonial.avatar ? (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-bronze/20 flex items-center justify-center">
                    <span className="text-bronze font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-bronze font-semibold text-sm">
                    {testimonial.author}
                  </p>
                  <p className={`${background === 'graphite' ? 'text-ivory/60' : 'text-graphite/60'} text-xs`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
