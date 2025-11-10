import { Header, Footer } from '@/components/layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: '2026: Протокол Спокойной Силы | Дизайн Эмоций',
  description: 'Интенсив для лидеров, которые готовятся к турбулентности. Превратите хаос 2026 года в возможности.',
};

export default function Navigator2026Page() {
  const fears = [
    '"А что, если клиенты перестанут ходить из-за роста цен?"',
    '"Как я объясню команде новые, более жесткие правила работы?"',
    '"Где взять силы на еще один кризис, когда я и так на пределе?"',
    '"Все вокруг говорят о налогах и маркировке, а меня парализует от одной мысли об этом"',
  ];

  const sessions = [
    {
      number: 1,
      title: 'Аудит Страхов',
      description: 'Диагностика и вербализация всех страхов, связанных с 2026 годом (налоги, маркировка, снижение спроса, уход мастеров).',
    },
    {
      number: 2,
      title: 'Калибровка Состояний',
      description: 'Обучение техникам быстрого возвращения в состояние "спокойной силы" в моменты паники.',
    },
    {
      number: 3,
      title: 'Архитектура Решений',
      description: 'Создание "дерева решений" для ключевых угроз 2026 года, где каждое решение принимается из состояния ясности, а не страха.',
    },
    {
      number: 4,
      title: 'Создание Протокола',
      description: 'Финализация персонального плана на Q1 2026. Ваш "Протокол Спокойной Силы" — готовый инструмент для выживания и процветания.',
    },
  ];

  return (
    <>
      <Header />
      
      <main className="pt-20">
        
        {/* Hero с видео-эффектом */}
        <section className="relative min-h-screen flex items-center justify-center bg-graphite overflow-hidden">
          {/* Эффект волн (CSS animation) */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-b from-bronze/20 to-transparent animate-pulse" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-bronze/20 rounded-full border border-bronze/50">
              <AlertTriangle className="w-5 h-5 text-bronze" />
              <span className="text-bronze text-sm font-semibold">Интенсив • Декабрь 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ivory mb-8 leading-tight">
              2026-й уже здесь.<br />
              Ваше состояние готово?
            </h1>
            
            <div className="h-0.5 w-32 md:w-48 bg-bronze mx-auto mb-8" />
            
            <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Пока все панически меняют прайсы и бизнес-процессы,<br className="hidden md:block" />
              самые мудрые лидеры готовят свой главный актив — эмоциональную стабильность
            </p>

            <Button
              onClick={() => {
                const element = document.getElementById('fear');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              className="bg-bronze hover:bg-bronze-dark text-graphite text-lg px-8 py-6"
            >
              Получить протокол спокойной силы
            </Button>

            <p className="text-ivory/50 text-sm mt-6">
              Осталось 5 мест на интенсив в декабре
            </p>
          </div>
        </section>

        {/* Вербализация страха */}
        <section id="fear" className="py-24 bg-ivory">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite text-center mb-6">
              Этот фоновый гул тревоги,<br />который вы чувствуете...
            </h2>
            <p className="text-xl text-graphite/70 text-center mb-16">
              Он не только у вас.
            </p>

            <div className="space-y-6 mb-12">
              {fears.map((fear, index) => (
                <div key={index} className="p-6 bg-white rounded-lg border-l-4 border-bronze shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-bronze/20 flex items-center justify-center shrink-0">
                      <span className="text-bronze font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-lg text-graphite/90 leading-relaxed italic">
                      {fear}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-bronze/5 rounded-lg border border-bronze/30 text-center">
              <p className="text-lg text-graphite/80 mb-4">
                Если хотя бы одна из этих мыслей вам знакома —<br />
                значит, пора не реагировать, а действовать.
              </p>
              <Button
                onClick={() => {
                  const element = document.getElementById('alternative');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-midnight hover:bg-midnight-hover text-ivory px-6 py-3"
              >
                Узнать альтернативу
              </Button>
            </div>
          </div>
        </section>

        {/* Альтернатива */}
        <section id="alternative" className="py-24 bg-graphite">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Shield className="w-12 h-12 text-bronze" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ivory text-center mb-12">
              Паника — это роскошь,<br />которую лидер не может себе позволить
            </h2>

            <div className="space-y-8 text-ivory/90 leading-relaxed text-lg">
              <p>
                В условиях турбулентности есть две стратегии: <strong className="text-ivory">реагировать или создавать</strong>.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-midnight/30 rounded-lg border border-ivory/10">
                  <h3 className="text-xl font-semibold text-bronze mb-3">Паника — это реакция</h3>
                  <p className="text-ivory/70 text-sm">
                    Она сжигает вашу энергию и приводит к ошибочным решениям.
                    Паника делает вас заложником обстоятельств.
                  </p>
                </div>

                <div className="p-6 bg-bronze/20 rounded-lg border border-bronze/50">
                  <h3 className="text-xl font-semibold text-bronze mb-3">Спокойная сила — это создание</h3>
                  <p className="text-graphite/90 text-sm">
                    Это осознанное создание. Это способность видеть возможности там,
                    где другие видят угрозы.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-graphite-light rounded-lg border-l-4 border-bronze">
                <p className="text-xl font-medium text-bronze mb-3">
                  Ключевое отличие:
                </p>
                <p>
                  Это то, что отличает лидера, который выживет, от того,
                  кто поведет свою команду к процветанию в 2026 году.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Интенсив */}
        <section className="py-24 bg-ivory">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite mb-6">
                Интенсив "Навигатор 2026"
              </h2>
              <p className="text-xl text-graphite/70 max-w-3xl mx-auto leading-relaxed">
                4-недельный персональный спринт для создания вашего
                <strong className="text-bronze"> Протокола Спокойной Силы</strong>
              </p>
            </div>

            {/* Сессии */}
            <div className="space-y-6 mb-12">
              {sessions.map((session) => (
                <div key={session.number} className="bg-white p-8 rounded-lg border border-graphite/20 hover:border-bronze hover:shadow-lg transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-full bg-bronze/20 flex items-center justify-center shrink-0">
                      <span className="text-2xl font-bold text-bronze">{session.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-graphite mb-3">
                        {session.title}
                      </h3>
                      <p className="text-graphite/80 leading-relaxed">
                        {session.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Результат */}
            <div className="p-8 bg-gradient-to-br from-bronze/10 to-bronze/5 rounded-lg border-2 border-bronze/30">
              <div className="flex items-start gap-4 mb-4">
                <CheckCircle2 className="w-8 h-8 text-bronze shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-graphite mb-3">
                    Результат через 4 недели:
                  </h3>
                  <p className="text-lg text-graphite/90 leading-relaxed">
                    Вы входите в 2026 год с персональным <strong className="text-bronze">"Протоколом Спокойной Силы"</strong> —
                    пошаговым планом действий и состояний для ответа на главные вызовы предстоящего года.
                  </p>
                </div>
              </div>
            </div>

            {/* Стоимость */}
            <div className="mt-12 text-center">
              <div className="inline-block mb-6">
                <p className="text-graphite/60 text-sm mb-2">Инвестиция в вашу ясность:</p>
                <p className="text-5xl font-bold text-bronze">120 000 ₽</p>
                <p className="text-graphite/60 text-sm mt-2">4 недели персонального сопровождения</p>
              </div>
            </div>
          </div>
        </section>

        {/* Об авторе (краткая версия) */}
        <section className="py-20 bg-graphite">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center">
                <div className="w-40 h-40 rounded-lg bg-bronze/20 flex items-center justify-center border-2 border-bronze/50">
                  <span className="text-5xl font-bold text-bronze">ГТ</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-ivory mb-3">
                  Георгий Тактаров
                </h3>
                <p className="text-bronze text-lg mb-4">
                  Архитектор Эмоций
                </p>
                <p className="text-ivory/80 leading-relaxed">
                  Я не обещаю, что шторма не будет. Я гарантирую, что ваш корабль пройдет через него
                  и станет только крепче. В условиях турбулентности выживают не самые умные,
                  а самые эмоционально стабильные лидеры.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-ivory">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-6">
                Инвестируйте в свою ясность на 2026 год
              </h2>
              <p className="text-lg text-graphite/70 mb-2 leading-relaxed">
                Мест на интенсив в декабре ограничено: я лично работаю только с <strong>5 лидерами</strong>.
              </p>
              <p className="text-graphite/60">
                Ваш первый шаг — подать заявку на стратегическую сессию,
                чтобы определить, подходит ли вам эта программа.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#cta">
                <Button size="lg" className="bg-bronze hover:bg-bronze-dark text-graphite px-8 py-4 text-lg">
                  Подать заявку
                </Button>
              </Link>
              <Link href="/georgiy-taktarov">
                <Button size="lg" variant="outline" className="border-graphite/30 text-graphite hover:bg-graphite/5 px-8 py-4 text-lg">
                  Об авторе
                </Button>
              </Link>
            </div>

            <p className="text-center text-graphite/50 text-sm mt-8">
              Старт интенсива: декабрь 2025
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
