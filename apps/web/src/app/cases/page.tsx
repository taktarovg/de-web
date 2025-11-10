import { Header, Footer } from '@/components/layout';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users } from 'lucide-react';

export const metadata = {
  title: 'Кейсы | Траектории трансформации',
  description: 'Реальные истории работы с методом "Дизайн Эмоций". Как лидеры преодолевают внутренние барьеры и выходят на новый уровень.',
};

export default function CasesPage() {
  const cases = [
    {
      id: 'anna',
      title: 'От "Стеклянного Потолка" до Открытия Второго Салона',
      client: 'Анна, 38 лет',
      industry: 'Салон красоты',
      problem: 'Страх масштабирования',
      result: '6 млн ₽ дополнительного дохода за первый год',
      icon: TrendingUp,
      color: 'bronze',
    },
    {
      id: 'marina',
      title: 'От Мастера к Руководителю',
      client: 'Марина, 35 лет',
      industry: 'Студия наращивания ресниц',
      problem: 'Страх делегирования',
      result: '+15% выручки при -70% личной работы',
      icon: Users,
      color: 'midnight',
    },
  ];

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-graphite">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ivory text-center mb-6">
              Траектории Трансформации
            </h1>
            <p className="text-lg md:text-xl text-ivory/80 text-center max-w-2xl mx-auto leading-relaxed">
              Реальные истории работы с методом "Дизайн Эмоций".<br />
              Имена и детали изменены для конфиденциальности.
            </p>
          </div>
        </section>

        {/* Оглавление */}
        <section className="py-16 bg-ivory">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-graphite mb-8 text-center">
              Кейсы
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {cases.map((caseItem) => {
                const Icon = caseItem.icon;
                return (
                  <Link
                    key={caseItem.id}
                    href={`#${caseItem.id}`}
                    className="group p-6 bg-white rounded-lg border-2 border-graphite/10 hover:border-bronze hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        caseItem.color === 'bronze' 
                          ? 'bg-bronze/20' 
                          : 'bg-midnight/20'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          caseItem.color === 'bronze'
                            ? 'text-bronze'
                            : 'text-midnight'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-graphite mb-2 group-hover:text-bronze transition-colors">
                          {caseItem.title}
                        </h3>
                        <p className="text-sm text-graphite/60 mb-3">
                          {caseItem.client} • {caseItem.industry}
                        </p>
                        <div className="space-y-1 text-sm">
                          <p className="text-graphite/80">
                            <span className="font-medium">Проблема:</span> {caseItem.problem}
                          </p>
                          <p className="text-bronze font-medium">
                            <span className="text-graphite/80">Результат:</span> {caseItem.result}
                          </p>
                        </div>
                      </div>

                      <ArrowRight className="w-5 h-5 text-bronze opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Кейс 1: Анна */}
        <section id="anna" className="py-20 bg-graphite scroll-mt-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            
            {/* Заголовок кейса */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-4">
                От "Стеклянного Потолка" до Открытия Второго Салона
              </h2>
              <p className="text-lg text-ivory/70">
                Как "Дизайн Эмоций" помог владелице успешного бизнеса преодолеть страх масштабирования и выйти на новый уровень.
              </p>
            </div>

            {/* Клиент */}
            <div className="mb-10 p-6 bg-graphite-light rounded-lg border border-bronze/30">
              <h3 className="text-bronze text-sm font-semibold uppercase tracking-wider mb-2">Клиент</h3>
              <p className="text-ivory/90 leading-relaxed">
                Анна (имя изменено), 38 лет. Владелица и идейный вдохновитель одного из топовых салонов красоты в Москве. 
                Успешная, энергичная, пользуется уважением команды и любовью клиентов.
              </p>
            </div>

            {/* Точка А */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-bronze mb-4">Точка А: Проблема</h3>
              <div className="space-y-4 text-ivory/90 leading-relaxed">
                <p>
                  На первый взгляд, у Анны все было идеально. Салон приносил стабильный доход, команда работала как часы. 
                  Но уже год она топталась на месте. Идея открыть второй, флагманский салон, о котором она давно мечтала, 
                  была полностью готова на бумаге, но Анна не могла сделать решающий шаг.
                </p>
                
                <div className="p-4 bg-midnight/20 rounded border-l-4 border-bronze">
                  <h4 className="text-bronze font-semibold mb-2">Ключевые симптомы:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Прокрастинация:</strong> Важные решения по аренде и найму откладывались неделями.</li>
                    <li><strong>Гиперконтроль:</strong> Анна начала вмешиваться в мелкие операционные задачи вместо стратегии.</li>
                    <li><strong>Эмоциональное состояние:</strong> Постоянное фоновое раздражение и тревога. "Я как будто еду на мощной машине, но постоянно жму на тормоз".</li>
                  </ul>
                </div>

                <p>Анна была уверена, что ей не хватает правильной бизнес-стратегии или "волшебного пинка".</p>
              </div>
            </div>

            {/* Процесс работы */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-bronze mb-4">Процесс работы: Сессия 90 минут</h3>
              <div className="space-y-4 text-ivory/90 leading-relaxed">
                <p>
                  Мы не стали строить новые бизнес-планы. Вместо этого мы погрузились в исследование того самого "внутреннего тормоза".
                </p>

                <div className="p-4 bg-bronze/10 rounded">
                  <p className="font-semibold text-bronze mb-2">Ключевой Момент — Обнаружение Роли</p>
                  <p className="text-sm">
                    За раздражением и тревогой стоял более глубокий <strong>Страх</strong>. "Чего вы боитесь на самом деле?" — 
                    "Я боюсь снова все потерять. Я боюсь разочароваться в себе."
                  </p>
                </div>

                <p>
                  Этот страх привел нас к истории десятилетней давности — к первому бизнес-проекту Анны (небольшому ателье), 
                  который прогорел, оставив ее с долгами и сокрушительным чувством стыда.
                </p>

                <div className="p-4 bg-graphite-light rounded border border-bronze/50">
                  <p className="text-bronze font-semibold mb-2">Скрытая управляющая роль: "Несостоявшийся Предприниматель"</p>
                  <p className="text-sm italic">
                    "Твой нынешний успех — просто удача. Не испытывай судьбу. Если ты попробуешь сделать что-то по-настоящему большое, 
                    ты снова провалишься, и всем станет очевидно, что ты — самозванка."
                  </p>
                </div>

                <p>
                  <strong>Трансформация:</strong> Ключевым моментом сессии стала практика Принятия и Прощения. Анна смогла с состраданием 
                  посмотреть на ту молодую версию себя, принять ее историю и простить себя. "Боже, я как будто сняла с себя рюкзак с камнями, 
                  который носила 10 лет."
                </p>
              </div>
            </div>

            {/* Точка Б */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-bronze mb-4">Точка Б: Результаты через месяц</h3>
              <div className="space-y-4 text-ivory/90 leading-relaxed">
                <p className="text-lg font-medium text-bronze">
                  Внутренняя трансформация немедленно отразилась на внешних действиях.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-bronze mt-1">✓</span>
                    <span>Через неделю подписала договор аренды, над которым раздумывала полгода</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-bronze mt-1">✓</span>
                    <span>Перестала заниматься микроменеджментом, полностью доверив салон управляющему</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-bronze mt-1">✓</span>
                    <span>Провела три собеседования и наняла двух ключевых мастеров</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-bronze mt-1">✓</span>
                    <span>План по запуску перестал быть источником страха и превратился в увлекательный проект</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Прямая речь */}
            <div className="mb-10 p-6 bg-bronze/10 rounded-lg border-l-4 border-bronze">
              <p className="text-ivory/90 leading-relaxed italic">
                "Я пришла к Георгию за бизнес-консультацией, а получила нечто гораздо большее. Я думала, мне не хватает знаний или мотивации, 
                а оказалось, что я все это время боролась с призраком из своего прошлого. Та 90-минутная сессия сэкономила мне минимум год 
                прокрастинации и, вероятно, несколько миллионов упущенной выгоды. Я не просто получила 'разрешение' на успех, 
                я вернула себе себя."
              </p>
              <p className="text-bronze font-semibold mt-4">— Анна</p>
            </div>

            {/* Финансовый результат */}
            <div className="mb-10 grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-midnight/30 rounded-lg border border-ivory/10">
                <h4 className="text-bronze font-semibold mb-3">"Налог на эмоции"</h4>
                <p className="text-ivory/80 text-sm leading-relaxed">
                  Страх повторения неудачи заставлял откладывать проект, который должен был приносить 500,000 ₽ чистой прибыли в месяц. 
                  Каждый месяц прокрастинации = 500,000 ₽ упущенной выгоды. За год = <strong className="text-bronze">6 млн ₽</strong> "налога".
                </p>
              </div>

              <div className="p-6 bg-bronze/20 rounded-lg border border-bronze/50">
                <h4 className="text-bronze font-semibold mb-3">"Эмоциональный доход"</h4>
                <p className="text-ivory/90 text-sm leading-relaxed">
                  Одна 90-минутная сессия устранила причину промедления. Анна сэкономила год времени, опередила конкурентов и запустила проект, 
                  который принес дополнительные <strong className="text-bronze">6 млн ₽</strong> уже в первый год работы второго салона.
                </p>
              </div>
            </div>

            {/* Эффект на жизнь */}
            <div className="p-6 bg-graphite-light rounded-lg border border-bronze/30">
              <h4 className="text-bronze font-semibold mb-3">Эффект на жизнь: Возвращение легкости</h4>
              <p className="text-ivory/80 text-sm leading-relaxed mb-3">
                До сессии постоянная тревога заставляла Анну быть "железной леди" не только на работе, но и дома. Она была требовательна к близким, 
                редко позволяла себе расслабиться.
              </p>
              <p className="text-ivory/90 text-sm leading-relaxed">
                Освободившись от роли "несостоявшегося предпринимателя", Анна вернула себе легкость. Она стала спокойнее реагировать на бытовые проблемы, 
                чаще смеяться и проводить время с детьми, будучи полностью вовлеченной в момент. Ее муж заметил, что к нему вернулась "та самая Аня" — 
                авантюрная, смелая и легкая на подъем.
              </p>
            </div>

          </div>
        </section>

        {/* Кейс 2: Марина */}
        <section id="marina" className="py-20 bg-ivory scroll-mt-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            
            {/* Заголовок кейса */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-4">
                От Мастера к Руководителю
              </h2>
              <p className="text-lg text-graphite/70">
                Как "Дизайн Эмоций" помог топовому мастеру по наращиванию ресниц преодолеть страх делегирования и стать настоящим владельцем бизнеса.
              </p>
            </div>

            {/* Клиент */}
            <div className="mb-10 p-6 bg-white rounded-lg border border-graphite/20">
              <h3 className="text-bronze text-sm font-semibold uppercase tracking-wider mb-2">Клиент</h3>
              <p className="text-graphite/90 leading-relaxed">
                Марина (имя изменено), 35 лет. Основательница и ведущий мастер успешной моностудии по наращиванию ресниц. 
                Ее имя — бренд, а запись к ней закрыта на два месяца вперед. Она — "играющий тренер", который приносит 70% выручки салона.
              </p>
            </div>

            {/* Точка А */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-bronze mb-4">Точка А: Проблема</h3>
              <div className="space-y-4 text-graphite/90 leading-relaxed">
                <p>
                  Марина обратилась с проблемой, знакомой каждому мастеру, решившему расти: она "застряла" в собственном бизнесе. 
                  Она наняла двух мастеров, но вместо того, чтобы управлять и развивать студию, она работала больше всех.
                </p>
                
                <div className="p-4 bg-bronze/5 rounded border-l-4 border-bronze">
                  <h4 className="text-bronze font-semibold mb-2">Ключевые симптомы:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Страх делегирования:</strong> Не доверяла "важных" клиентов, боясь "сделают не так, как я".</li>
                    <li><strong>Синдром "незаменимости":</strong> Не могла уйти в отпуск, боялась, что "все рухнет".</li>
                    <li><strong>Эмоциональное выгорание:</strong> Работа 10-12 часов, полное истощение. "Я построила не бизнес, а красивую тюрьму для себя".</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Процесс работы */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-bronze mb-4">Процесс работы: Сессия 90 минут</h3>
              <div className="space-y-4 text-graphite/90 leading-relaxed">
                <p>
                  Мы не стали разбирать техники менеджмента или найма. Мы начали искать корень ее страха "отпустить контроль".
                </p>

                <div className="p-4 bg-white rounded border border-bronze/30">
                  <p className="font-semibold text-bronze mb-2">Ключевой Момент — Обнаружение Роли</p>
                  <p className="text-sm">
                    Самооценка Марины была напрямую связана с ее мастерством, а не с ролью руководителя. Связка: "моя ценность = моя идеальная работа".
                  </p>
                </div>

                <div className="p-4 bg-bronze/10 rounded border border-bronze/50">
                  <p className="text-bronze font-semibold mb-2">Управляющая роль: "Мастер-Отличница, которая должна быть лучше всех"</p>
                  <p className="text-sm">
                    Эта роль помогла ей стать лучшей и построить успешную студию. Но теперь, когда задача изменилась (стать руководителем), 
                    эта же роль начала ее разрушать. "Отличница" не могла допустить несовершенства других, а значит, не могла никому доверять.
                  </p>
                </div>

                <p>
                  <strong>Трансформация:</strong> Марина смогла разделить свою Личность от Профессиональной Функции. Она осознала, что ее ценность 
                  как основателя — не в том, чтобы клеить ресницы лучше всех, а в том, чтобы создать систему, где другие мастера могут расти. 
                  Она отпустила роль "Отличницы" и дала себе право на новую роль — "Наставника и Владельца Бизнеса".
                </p>
              </div>
            </div>

            {/* Точка Б */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-bronze mb-4">Точка Б: Результаты через 2 месяца</h3>
              <div className="space-y-4 text-graphite/90 leading-relaxed">
                <p className="text-lg font-medium text-bronze">
                  Внутренний сдвиг идентичности привел к быстрым изменениям в бизнесе.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-bronze mt-1">✓</span>
                    <span>Полностью перестала принимать новых клиентов, передавая их своим мастерам</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-bronze mt-1">✓</span>
                    <span>Ввела систему внутреннего обучения и контроля качества</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-bronze mt-1">✓</span>
                    <span>Наняла администратора, делегировав всю операционную рутину</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-bronze mt-1">✓</span>
                    <span>Высвободив 20+ часов в неделю, начала заниматься стратегическим маркетингом и планированием школы</span>
                  </li>
                </ul>

                <div className="p-4 bg-bronze/5 rounded">
                  <p className="text-sm">
                    <strong className="text-bronze">Финансовый результат:</strong> Несмотря на то, что Марина стала работать с клиентами на 70% меньше, 
                    общая выручка салона выросла на 15% за счет более плотной загрузки других мастеров.
                  </p>
                </div>
              </div>
            </div>

            {/* Прямая речь */}
            <div className="mb-10 p-6 bg-bronze/10 rounded-lg border-l-4 border-bronze">
              <p className="text-graphite/90 leading-relaxed italic">
                "Я всегда думала, что проблема в моих сотрудниках, что они 'недостаточно хороши'. Сессия с Георгием показала мне, что проблема была во мне. 
                Я не давала им шанса, потому что боялась потерять свою 'корону'. Как только я отпустила эту роль 'супер-мастера', я наконец-то смогла 
                стать настоящим руководителем. Это было самое важное бизнес-решение за всю мою карьеру."
              </p>
              <p className="text-bronze font-semibold mt-4">— Марина</p>
            </div>

            {/* Финансовый результат */}
            <div className="mb-10 grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-graphite/5 rounded-lg border border-graphite/20">
                <h4 className="text-bronze font-semibold mb-3">"Налог на гиперконтроль"</h4>
                <p className="text-graphite/80 text-sm leading-relaxed">
                  Оставаясь "супер-мастером", Марина достигла физического и финансового потолка. Недоверие к команде приводило к высокой текучке. 
                  Один новый мастер = 100,000 ₽ убытков (время, обучение, низкая загрузка). Постоянная стагнация и ежегодные убытки.
                </p>
              </div>

              <div className="p-6 bg-bronze/10 rounded-lg border border-bronze/50">
                <h4 className="text-bronze font-semibold mb-3">"Эмоциональный доход"</h4>
                <p className="text-graphite/90 text-sm leading-relaxed">
                  Проработав роль "Отличницы", Марина превратила расходы в актив. Высвободив 20+ часов, она занялась развитием бизнеса, 
                  что привело к росту выручки на 15% (≈120,000 ₽/мес). В год = <strong className="text-bronze">1.5 млн ₽</strong> дополнительного дохода, 
                  заработанного не личным трудом, а системой.
                </p>
              </div>
            </div>

            {/* Эффект на жизнь */}
            <div className="p-6 bg-white rounded-lg border border-graphite/20">
              <h4 className="text-bronze font-semibold mb-3">Эффект на жизнь: Возвращение себе себя</h4>
              <p className="text-graphite/80 text-sm leading-relaxed mb-3">
                Гиперконтроль истощал Марину полностью. На личную жизнь не оставалось сил. Вечера в режиме "доползти до кровати", 
                выходные — попытки отоспаться. Постоянное чувство вины, что не уделяет внимания ни мужу, ни здоровью.
              </p>
              <p className="text-graphite/90 text-sm leading-relaxed">
                Освободившись от роли "Мастера-Отличницы", Марина впервые за годы разрешила себе быть "просто человеком". 
                Высвободившиеся 20 часов она инвестировала в себя: возобновила йогу, начала ходить на свидания с мужем, а главное — 
                впервые за 3 года уехала в полноценный двухнедельный отпуск, полностью отключив рабочий телефон. Она вернула себе свою жизнь.
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-graphite">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-6">
              Готовы к своей трансформации?
            </h2>
            <p className="text-lg text-ivory/80 mb-8">
              Первый шаг — 90-минутная стратегическая сессия, которая окупится в тот же день.
            </p>
            <Link
              href="/#cta"
              className="inline-block bg-bronze hover:bg-bronze-dark text-graphite font-semibold px-8 py-4 rounded transition-all hover:shadow-xl"
            >
              Подать заявку
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
