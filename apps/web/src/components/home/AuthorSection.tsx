import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthorSection() {
  return (
    <section className="py-24 bg-ivory">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Левая колонка: Фото */}
          <div className="flex justify-center">
            <Link href="/georgiy-taktarov" className="block group">
              <div className="relative w-72 h-72 rounded-lg overflow-hidden border-2 border-bronze/30 group-hover:border-bronze transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                <Image
                  src="/images/georgiy-taktarov.webp"
                  alt="Георгий Тактаров - Основатель метода Дизайн Эмоций"
                  width={288}
                  height={288}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Правая колонка: Текст */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-graphite mb-2">
              Георгий Тактаров
            </h2>
            <p className="text-lg text-graphite/70 mb-8">
              Основатель метода "Дизайн Эмоций"
            </p>

            <div className="space-y-6 text-graphite/90 leading-relaxed mb-8">
              <p>
                Я не психолог. Я не коуч в классическом понимании. 
                Я предприниматель, который прошел через эмоциональное 
                выгорание, потерю бизнеса и долгий путь к пониманию того, 
                что мои главные ошибки всегда были продуктом моих 
                неуправляемых эмоций, а не недостатка знаний или опыта.
              </p>

              <p>
                За последние 7 лет я исследовал всё, что мог найти об эмоциях 
                и принятии решений: от нейробиологии до древних практик 
                осознанности. Я синтезировал это в рабочую методику, которую 
                сначала применил к себе, потом к своей команде, а теперь — 
                к лидерам, которые принимают решения с высокой ценой ошибки.
              </p>

              <p>
                Метод "Дизайн Эмоций" — это не про работу с "плохими чувствами". 
                Это про создание внутренней архитектуры, которая превращает 
                эмоции из врагов в союзников. Это про то, как стать автором 
                своих решений, а не их заложником.
              </p>
            </div>

            <Link href="/georgiy-taktarov">
              <Button className="bg-midnight hover:bg-midnight-hover text-ivory">
                Узнать больше обо мне
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
