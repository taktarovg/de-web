export default function SolutionSection() {
  return (
    <section className="py-24 bg-graphite">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ivory text-center mb-16 leading-tight">
          От Реакции к Дизайну
        </h2>

        <div className="space-y-8 text-ivory/90 text-lg leading-relaxed">
          <p>
            Большинство людей пытаются "управлять" эмоциями или, что еще 
            хуже, подавлять их. Это как пытаться остановить океан руками. 
            Эмоции не нужно подавлять. Их нужно понимать и использовать.
          </p>

          <p>
            "Дизайн Эмоций" — это не терапия и не коучинг в классическом 
            понимании. Это технология превращения эмоций в данные для 
            принятия стратегических решений. Это апгрейд вашей внутренней 
            операционной системы.
          </p>

          <p>
            Вы не "лечитесь" от эмоций. Вы учитесь калибровать своё 
            состояние так же, как калибруете финансовую модель компании 
            или маркетинговую стратегию. Эмоции — это ваш главный 
            стратегический актив. Когда вы владеете ими, вы владеете игрой.
          </p>
        </div>

        {/* Слоган */}
        <div className="mt-16 p-8 border-2 border-bronze rounded-lg bg-graphite-light">
          <p className="text-2xl md:text-3xl font-semibold text-bronze text-center leading-relaxed">
            Проектируйте свои эмоции —<br />
            проектируйте свою жизнь
          </p>
        </div>

        {/* Инфографика 4 шага */}
        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { title: 'Реакция', desc: 'Триггер' },
              { title: 'Осознание', desc: 'Распознавание' },
              { title: 'Дизайн', desc: 'Выбор' },
              { title: 'Действие', desc: 'Реализация' }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bronze/20 flex items-center justify-center text-bronze text-2xl font-bold group-hover:bg-bronze group-hover:text-graphite transition-all">
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-bronze/30" />
                  )}
                </div>
                <h3 className="text-ivory font-semibold mb-1">{step.title}</h3>
                <p className="text-ivory/60 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
