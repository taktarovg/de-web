export default function CasesSection() {
  const cases = [
    {
      title: 'CEO IT-компании',
      situation: 'Клиент находился на финальной стадии переговоров о слиянии своей компании с крупным игроком рынка. Потенциальная сделка оценивалась в $15M. Однако переговоры застопорились из-за личной неприязни к одному из партнеров с противоположной стороны. Клиент чувствовал раздражение каждый раз, когда видел этого человека, и готов был сорвать всю сделку.',
      solution: 'За две сессии мы применили протокол отделения эго от стратегических интересов компании. Выяснилось, что раздражение было вызвано не действиями партнера, а тем, что он напоминал клиенту о его собственном отце, с которым были неразрешенные конфликты. Мы разделили эти два контекста и создали новую стратегию взаимодействия.',
      result: 'Сделка была успешно закрыта. Клиент не только сохранил контроль над ключевыми решениями, но и получил лучшие условия, так как смог вести переговоры из состояния ясности, а не эмоциональной реактивности.',
      highlight: 'ROI от двух сессий: $15M + сохраненное ментальное здоровье.'
    },
    {
      title: 'Основатель маркетингового агентства',
      situation: 'Клиентка управляет агентством с командой 25 человек. Последние полгода она чувствовала нарастающее выгорание, раздражалась на команду за "неспособность работать самостоятельно", теряла ключевых клиентов из-за срывов на встречах. Она была готова закрыть бизнес.',
      solution: 'Через серию из 6 сессий мы обнаружили, что её раздражение было не на команду, а на саму себя — она не могла отпустить контроль и делегировать задачи, потому что внутренне считала, что "если я не буду нужна, меня бросят". Это убеждение сформировалось еще в детстве. Мы переписали этот сценарий.',
      result: 'Клиентка научилась делегировать ответственность, создала систему управления без микроменеджмента. За 3 месяца после программы агентство увеличило выручку на 40%, она вернула троих ключевых клиентов и впервые за 5 лет взяла отпуск на две недели без ущерба для бизнеса.',
      highlight: null
    }
  ];

  return (
    <section id="cases" className="py-24 bg-graphite">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ivory mb-4">
            Траектории Трансформации
          </h2>
          <p className="text-ivory/70 max-w-2xl mx-auto">
            Реальные истории работы с методом "Дизайн Эмоций".<br />
            Имена и детали изменены для конфиденциальности.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="bg-graphite-light rounded-lg p-8 border border-bronze/20 hover:border-bronze/40 transition-all"
            >
              <h3 className="text-2xl font-semibold text-ivory mb-6">
                {caseItem.title}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-bronze text-sm font-semibold uppercase tracking-wider mb-2">
                    Ситуация:
                  </h4>
                  <p className="text-ivory/80 leading-relaxed">
                    {caseItem.situation}
                  </p>
                </div>

                <div>
                  <h4 className="text-bronze text-sm font-semibold uppercase tracking-wider mb-2">
                    Решение:
                  </h4>
                  <p className="text-ivory/80 leading-relaxed">
                    {caseItem.solution}
                  </p>
                </div>

                <div>
                  <h4 className="text-bronze text-sm font-semibold uppercase tracking-wider mb-2">
                    Результат:
                  </h4>
                  <p className="text-ivory/80 leading-relaxed">
                    {caseItem.result}
                  </p>
                  {caseItem.highlight && (
                    <p className="text-bronze font-semibold mt-2">
                      {caseItem.highlight}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
