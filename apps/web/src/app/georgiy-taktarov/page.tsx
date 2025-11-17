import { Header, Footer } from '@/components/layout';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Send } from 'lucide-react';

export const metadata = {
  title: 'Георгий Тактаров | Основатель метода "Дизайн Эмоций"',
  description: 'Предприниматель, который прошел через эмоциональное выгорание и создал методику превращения эмоций в стратегический актив.',
};

export default function GeorgiyPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-graphite">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Фото Георгия */}
              <div className="flex justify-center md:justify-start">
                <div className="relative w-80 h-80 rounded-lg overflow-hidden border-2 border-bronze/50 shadow-2xl">
                  <Image
                    src="/images/georgiy-taktarov.webp"
                    alt="Георгий Тактаров - Основатель метода Дизайн Эмоций"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>

              {/* Заголовок */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-ivory mb-4">
                  Георгий Тактаров
                </h1>
                <p className="text-2xl text-bronze mb-6">
                  Основатель метода "Дизайн Эмоций"
                </p>
                <p className="text-lg text-ivory/80 leading-relaxed">
                  Предприниматель, который прошел через эмоциональное выгорание, потерю бизнеса и долгий путь к пониманию того, 
                  что главные ошибки всегда были продуктом неуправляемых эмоций, а не недостатка знаний или опыта.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* История */}
        <section className="py-20 bg-ivory">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-12 text-center">
              Моя история
            </h2>

            <div className="space-y-8 text-graphite/90 leading-relaxed">
              <p className="text-lg">
                Я не психолог. Я не коуч в классическом понимании. Я предприниматель, который столкнулся с жестокой правдой: 
                <strong className="text-graphite"> самые дорогостоящие бизнес-ошибки происходят не от недостатка знаний, а от неуправляемых эмоций</strong>.
              </p>

              <div className="p-6 bg-white rounded-lg border-l-4 border-bronze">
                <h3 className="font-semibold text-graphite mb-3">Точка разворота</h3>
                <p className="text-sm">
                  Десять лет назад я потерял бизнес. Не из-за плохой бизнес-модели и не из-за кризиса на рынке. 
                  Я потерял его потому, что принимал ключевые решения из состояния страха, гордыни и тревоги, даже не осознавая этого. 
                  Когда пыль осела, я понял: <strong>мой главный конкурент всегда был внутри меня</strong>.
                </p>
              </div>

              <p>
                Следующие семь лет я потратил на исследование того, как эмоции управляют решениями, даже когда мы уверены, 
                что действуем рационально. Я изучал нейробиологию, древние практики осознанности, работы Дэвида Хокинса, 
                метод Седона, современную психологию принятия решений.
              </p>

              <p>
                Но теория оставалась теорией, пока я не начал применять эти знания к себе. Я прошел через собственную трансформацию — 
                научился распознавать свои эмоциональные триггеры, отделять эго от стратегии, принимать решения из состояния ясности, 
                а не реактивности.
              </p>

              <div className="p-6 bg-bronze/10 rounded-lg">
                <h3 className="font-semibold text-graphite mb-3">Рождение метода</h3>
                <p className="text-sm">
                  Когда я вернулся в бизнес, я был другим человеком. Я больше не принимал решений на эмоциях. 
                  Я начал тестировать эти инструменты на своей команде, а затем — на других предпринимателях. 
                  Результаты были впечатляющими. Люди не просто чувствовали себя лучше — они начинали принимать более качественные решения, 
                  их бизнес рос, а они сами переставали быть заложниками своих эмоциональных паттернов.
                </p>
              </div>

              <p>
                Так родился метод <strong>"Дизайн Эмоций"</strong> — не терапия, не классический коучинг, 
                а технология превращения эмоций в данные для принятия стратегических решений.
              </p>
            </div>
          </div>
        </section>

        {/* Философия */}
        <section className="py-20 bg-graphite">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-12 text-center">
              Моя философия
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-graphite-light rounded-lg border border-bronze/30">
                <h3 className="text-xl font-semibold text-bronze mb-3">Эмоции — не враги</h3>
                <p className="text-ivory/80 text-sm leading-relaxed">
                  Большинство людей пытаются "управлять" эмоциями или подавлять их. Это как пытаться остановить океан руками. 
                  Эмоции не нужно подавлять. Их нужно понимать и использовать.
                </p>
              </div>

              <div className="p-6 bg-graphite-light rounded-lg border border-bronze/30">
                <h3 className="text-xl font-semibold text-bronze mb-3">Не лечение, а калибровка</h3>
                <p className="text-ivory/80 text-sm leading-relaxed">
                  Вы не "лечитесь" от эмоций. Вы учитесь калибровать своё состояние так же, как калибруете финансовую модель компании. 
                  Эмоции — это ваш главный стратегический актив.
                </p>
              </div>

              <div className="p-6 bg-graphite-light rounded-lg border border-bronze/30">
                <h3 className="text-xl font-semibold text-bronze mb-3">От реакции к дизайну</h3>
                <p className="text-ivory/80 text-sm leading-relaxed">
                  Метод "Дизайн Эмоций" — это не про работу с "плохими чувствами". Это про создание внутренней архитектуры, 
                  которая превращает эмоции из врагов в союзников.
                </p>
              </div>

              <div className="p-6 bg-graphite-light rounded-lg border border-bronze/30">
                <h3 className="text-xl font-semibold text-bronze mb-3">Стать автором решений</h3>
                <p className="text-ivory/80 text-sm leading-relaxed">
                  Когда вы владеете эмоциями, вы владеете игрой. Это про то, как стать автором своих решений, 
                  а не их заложником.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Для кого я работаю */}
        <section className="py-20 bg-ivory">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-12 text-center">
              С кем я работаю
            </h2>

            <div className="space-y-6">
              <div className="p-6 bg-white rounded-lg border border-graphite/20">
                <h3 className="text-xl font-semibold text-graphite mb-3">
                  Лидеры, принимающие решения с высокой ценой ошибки
                </h3>
                <p className="text-graphite/80 leading-relaxed">
                  Предприниматели, топ-менеджеры, основатели компаний — те, кто понимает, что качество их жизни напрямую зависит 
                  от качества их решений, а качество решений — от качества их эмоционального состояния.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg border border-graphite/20">
                <h3 className="text-xl font-semibold text-graphite mb-3">
                  Те, кто застрял на "стеклянном потолке"
                </h3>
                <p className="text-graphite/80 leading-relaxed">
                  Успешные профессионалы, у которых "все хорошо на бумаге", но внутри — ощущение застоя, прокрастинация важных решений, 
                  страх следующего шага. Те, кто интуитивно чувствует, что проблема не в стратегии, а в чем-то более глубоком.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg border border-graphite/20">
                <h3 className="text-xl font-semibold text-graphite mb-3">
                  Те, кто готов смотреть правде в глаза
                </h3>
                <p className="text-graphite/80 leading-relaxed">
                  Я не работаю с теми, кто ищет "волшебную таблетку" или готов винить обстоятельства. 
                  Я работаю с теми, кто готов честно посмотреть внутрь себя, признать свои эмоциональные паттерны и взять за них ответственность.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Подход к работе */}
        <section className="py-20 bg-graphite">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-12 text-center">
              Как я работаю
            </h2>

            <div className="space-y-6 text-ivory/90">
              <div className="p-6 bg-graphite-light rounded-lg border-l-4 border-bronze">
                <h3 className="text-xl font-semibold text-bronze mb-3">1. Никаких поверхностных разговоров</h3>
                <p className="text-sm leading-relaxed">
                  Я не занимаюсь мотивационными речами или поверхностными советами. Мы идем в глубину — туда, где скрыты настоящие причины 
                  ваших решений и поведения. Это не всегда комфортно, но всегда честно.
                </p>
              </div>

              <div className="p-6 bg-graphite-light rounded-lg border-l-4 border-bronze">
                <h3 className="text-xl font-semibold text-bronze mb-3">2. От диагностики к трансформации за одну сессию</h3>
                <p className="text-sm leading-relaxed">
                  Первая 90-минутная сессия — это не "знакомство", а полноценный аудит вашего внутреннего состояния. 
                  Вы уходите с конкретным планом и новым пониманием себя, которое можно применить немедленно.
                </p>
              </div>

              <div className="p-6 bg-graphite-light rounded-lg border-l-4 border-bronze">
                <h3 className="text-xl font-semibold text-bronze mb-3">3. Результат важнее процесса</h3>
                <p className="text-sm leading-relaxed">
                  Я не измеряю успех количеством сессий. Я измеряю его тем, насколько ваша жизнь и бизнес изменились. 
                  Моя задача — дать вам инструменты, которые будут работать и без меня.
                </p>
              </div>

              <div className="p-6 bg-graphite-light rounded-lg border-l-4 border-bronze">
                <h3 className="text-xl font-semibold text-bronze mb-3">4. Я работаю с людьми, а не с "клиентами"</h3>
                <p className="text-sm leading-relaxed">
                  Я не беру всех подряд. Я выбираю тех, с кем чувствую резонанс, и кто действительно готов к изменениям. 
                  Если после первой встречи я понимаю, что не могу вам помочь — я скажу об этом честно.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Контакты и CTA */}
        <section className="py-20 bg-ivory">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-6">
                Готовы начать?
              </h2>
              <p className="text-lg text-graphite/70 leading-relaxed">
                Первый шаг — 90-минутная стратегическая сессия. Это не бесплатная консультация, 
                на которой я "попробую вам что-то продать". Это полноценный аудит вашей внутренней системы, 
                который сам по себе окупится в тот же день.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/#cta"
                className="inline-flex items-center justify-center gap-2 bg-midnight hover:bg-midnight-hover text-ivory font-semibold px-8 py-4 rounded transition-all hover:shadow-xl"
              >
                Подать заявку
              </Link>
              <a
                href="https://t.me/taktarov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-graphite/20 hover:border-bronze text-graphite font-semibold px-8 py-4 rounded transition-all"
              >
                <Send className="w-5 h-5" />
                Написать в Telegram
              </a>
            </div>

            {/* Контакты */}
            <div className="text-center space-y-2 text-graphite/60">
              <p className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@designemotion.ru" className="hover:text-bronze transition-colors">
                  hello@designemotion.ru
                </a>
              </p>
            </div>

            {/* Открытая методология */}
            <div className="mt-16 p-6 bg-white rounded-lg border border-bronze/30 text-center">
              <p className="text-graphite/80 mb-3">
                Моя открытая методология и инструменты для самостоятельной работы:
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-bronze hover:text-bronze-light text-lg font-medium transition-colors"
              >
                <span>→</span>
                <span>diaryofemotions.ru</span>
              </Link>
              <p className="text-sm text-graphite/60 mt-2">
                Бесплатный дневник эмоций и анализатор
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
