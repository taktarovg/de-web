'use client';

import { Header, Footer } from '@/components/layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

export default function BeautyLeadersPage() {
  const pains = [
    {
      title: 'Эмоциональные качели "Команда-Звезда"',
      text: 'Вы чувствуете себя заложником своего лучшего мастера. Он приносит 40% выручки, но требует особого отношения и создает напряжение. Вы боитесь его потерять, но понимаете: если будете прогибаться — потеряете авторитет. Ваш бизнес зависит от настроения одного человека, и вы ненавидите это чувство бессилия.',
    },
    {
      title: 'Синдром "Атмосферного Хамелеона"',
      text: 'Вы устали быть вечным источником позитива для всех, кроме себя. Вы заходите в салон и мгновенно считываете атмосферу. Если она напряженная — вы чувствуете личную ответственность исправить её. Вы носите маску идеальной, энергичной владелицы, даже если внутри ураган. У вас нет права на плохой день, потому что ваш плохой день — это минус в кассе.',
    },
    {
      title: 'Паралич "Критики в Директ"',
      text: 'Один негативный комментарий способен перечеркнуть для вас сотню восторженных отзывов. Среди сотен восторженных отзывов вы получаете один негативный — и именно он крутится у вас в голове весь день, отравляя все достижения. Вы чувствуете, будто весь ваш труд, вся репутация поставлены под сомнение.',
    },
    {
      title: 'Конфликт "Творец vs. Предприниматель"',
      text: 'Вы все чаще ловите себя на мысли, что бизнес, который вы создавали из любви к красоте, превратился в рутину, которая эту любовь убивает. Вы начинали как мастер, как творец. Но теперь 90% вашего времени — таблицы, переговоры об аренде, закупка материалов. Творчество ушло. Вы теряете себя.',
    },
  ];

  const transformations = [
    {
      before: 'Умение отделить свою ценность от ежедневной выручки',
      after: 'Вы перестаете зависеть от чужого одобрения в личных отношениях',
    },
    {
      before: 'Способность спокойно выдерживать конфликт с "мастером-звездой"',
      after: 'Вы обретаете смелость выстраивать здоровые границы с близкими',
    },
    {
      before: 'Превращение критики клиента в точку роста',
      after: 'Вы начинаете видеть в жизненных трудностях не проблемы, а уроки',
    },
    {
      before: 'Стратегическое терпение при запуске новых услуг',
      after: 'Вы становитесь более чутким и принимающим родителем',
    },
  ];

  return (
    <>
      <Header />
      
      <main className="pt-20">
        
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-graphite via-graphite-dark to-graphite relative">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(196, 154, 108, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(196, 154, 108, 0.1) 0%, transparent 50%)`
          }} />
          
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ivory mb-8 leading-tight">
              Ваш салон — отражение<br />вашего состояния
            </h1>
            
            <div className="h-0.5 w-32 md:w-48 bg-bronze mx-auto mb-8" />
            
            <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Персональная программа для лидеров бьюти-индустрии,<br className="hidden md:block" />
              которые создают не просто бизнес, а атмосферу, в которую возвращаются
            </p>

            <Button
              onClick={() => {
                const element = document.getElementById('resonance');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              className="bg-bronze hover:bg-bronze-dark text-graphite text-lg px-8 py-6"
            >
              Узнать философию
            </Button>
          </div>
        </section>

        {/* Глубинный резонанс */}
        <section id="resonance" className="py-24 bg-ivory">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite text-center mb-6">
              Если вы узнаете себя хотя бы<br />в одном из этих пунктов...
            </h2>
            <p className="text-lg text-graphite/70 text-center mb-16 max-w-2xl mx-auto">
              Это не просто "стресс" или "выгорание". Это реальные, невысказанные боли,
              которые живут в голове у успешного руководителя салона.
            </p>

            <div className="space-y-8">
              {pains.map((pain, index) => (
                <div key={index} className="p-8 bg-white rounded-lg border-l-4 border-bronze shadow-sm">
                  <h3 className="text-xl font-semibold text-bronze mb-4">
                    Боль #{index + 1}: {pain.title}
                  </h3>
                  <p className="text-graphite/90 leading-relaxed italic">
                    "{pain.text}"
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-graphite/80 mb-6">
                Узнали себя? Значит, пора действовать.
              </p>
              <Button
                onClick={() => {
                  const element = document.getElementById('philosophy');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-midnight hover:bg-midnight-hover text-ivory px-8 py-3"
              >
                Узнать решение
              </Button>
            </div>
          </div>
        </section>

        {/* Философия */}
        <section id="philosophy" className="py-24 bg-graphite">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ivory text-center mb-12">
              От управления персоналом<br />к архитектуре состояний
            </h2>

            <div className="space-y-6 text-ivory/90 leading-relaxed">
              <p className="text-lg">
                Большинство руководителей пытаются "управлять" эмоциями команды через мотивационные беседы,
                тренинги и корпоративы. Но проблема глубже: нельзя создать правильную атмосферу в салоне,
                если внутри вас хаос.
              </p>

              <div className="p-6 bg-bronze/10 rounded-lg border border-bronze/30">
                <p className="text-lg font-medium text-bronze mb-3">
                  Ключевой принцип:
                </p>
                <p>
                  Ваша команда не читает ваши приказы. Она считывает ваше состояние.
                  Клиенты покупают не услугу — они покупают атмосферу, которую создаете вы.
                </p>
              </div>

              <p>
                Метод "Дизайн Эмоций" для бьюти-индустрии — это не про то, как мотивировать мастеров.
                Это про то, как стать тем лидером, за которым команда пойдет сама. Это про то,
                как превратить ваш внутренний хаос в спокойную силу, которая транслируется на всё пространство салона.
              </p>
            </div>
          </div>
        </section>

        {/* Эффект домино */}
        <section className="py-24 bg-ivory">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-graphite text-center mb-6">
              Ваш бизнес — лишь одно из зеркал
            </h2>
            <p className="text-lg text-graphite/70 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
              Архитектура вашего внутреннего мира едина. Нельзя навести порядок в "рабочей" комнате,
              оставив хаос в "личной". Принципы, которые мы внедряем для управления командой,
              неизбежно меняют то, как вы общаетесь с семьей.
            </p>

            {/* Таблица трансформаций */}
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-graphite/5 p-4 rounded-t-lg">
                    <h3 className="text-lg font-semibold text-graphite text-center">
                      Что мы калибруем в бизнесе...
                    </h3>
                  </div>
                  <div className="bg-bronze/5 p-4 rounded-t-lg">
                    <h3 className="text-lg font-semibold text-graphite text-center">
                      ...Неизбежно меняется в жизни
                    </h3>
                  </div>
                </div>

                {transformations.map((item, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-white p-6 rounded-lg border border-graphite/20">
                      <p className="text-graphite/90">{item.before}</p>
                    </div>
                    <div className="bg-bronze/10 p-6 rounded-lg border border-bronze/30 flex items-center gap-4">
                      <ArrowRight className="w-5 h-5 text-bronze shrink-0" />
                      <p className="text-graphite/90">{item.after}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 p-8 bg-graphite rounded-lg text-center">
              <p className="text-2xl text-ivory font-semibold">
                Вы приходите, чтобы стать более эффективным лидером.<br />
                Вы уходите, став более свободным человеком.
              </p>
            </div>
          </div>
        </section>

        {/* Программа */}
        <section className="py-24 bg-graphite">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-ivory text-center mb-12">
              Программа "Создатель Атмосферы"
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-graphite-light p-8 rounded-lg border border-bronze/30">
                <h3 className="text-2xl font-semibold text-bronze mb-4">
                  Эмоциональное лидерство
                </h3>
                <p className="text-ivory/80 leading-relaxed mb-6">
                  Вы получите "ключи" к мотивации вашей команды, перестав зависеть от настроения "звезд".
                  Научитесь транслировать спокойную силу вместо напряжения.
                </p>
                <ul className="space-y-2">
                  {[
                    'Работа с "мастерами-звездами"',
                    'Создание культуры команды',
                    'Управление конфликтами',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-ivory/70 text-sm">
                      <Check className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-graphite-light p-8 rounded-lg border border-bronze/30">
                <h3 className="text-2xl font-semibold text-bronze mb-4">
                  Архитектура состояний
                </h3>
                <p className="text-ivory/80 leading-relaxed mb-6">
                  Научитесь управлять своим состоянием так же, как управляете бизнес-процессами.
                  От "атмосферного хамелеона" к "источнику стабильности".
                </p>
                <ul className="space-y-2">
                  {[
                    'Калибровка эмоций',
                    'Работа с критикой',
                    'Возвращение энергии',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-ivory/70 text-sm">
                      <Check className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-graphite-light p-8 rounded-lg border border-bronze/30">
                <h3 className="text-2xl font-semibold text-bronze mb-4">
                  Баланс ролей
                </h3>
                <p className="text-ivory/80 leading-relaxed mb-6">
                  Вернитесь к творчеству без ущерба для бизнеса. Найдите гармонию между
                  "творцом" и "предпринимателем".
                </p>
                <ul className="space-y-2">
                  {[
                    'Делегирование без страха',
                    'Возвращение к творчеству',
                    'Стратегическое мышление',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-ivory/70 text-sm">
                      <Check className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/#program">
                <Button className="bg-bronze hover:bg-bronze-dark text-graphite px-8 py-4 text-lg">
                  Выбрать формат работы
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-ivory">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-6">
              Готовы к трансформации?
            </h2>
            <p className="text-lg text-graphite/70 mb-8 leading-relaxed">
              Первый шаг — 90-минутная стратегическая сессия. Это полноценный аудит вашего
              внутреннего состояния, который окупится в тот же день.
            </p>
            <Link href="/#cta">
              <Button className="bg-midnight hover:bg-midnight-hover text-ivory px-8 py-4 text-lg">
                Подать заявку
              </Button>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
