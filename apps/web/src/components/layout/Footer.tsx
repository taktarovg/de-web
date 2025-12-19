import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-graphite-dark py-12 border-t border-bronze/20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Главная секция */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* О проекте */}
          <div>
            <h3 className="text-ivory font-semibold mb-4">Дизайн Эмоций</h3>
            <p className="text-ivory/60 text-sm leading-relaxed mb-4">
              Персональное сопровождение для лидеров, принимающих решения с высокой ценой ошибки.
            </p>
            <p className="text-ivory/40 text-xs">
              ИП Тактаров Г.В.<br />
              ОГРНИП 325547600141358<br />
              ИНН 244400059945
            </p>
          </div>

          {/* Программы */}
          <div>
            <h3 className="text-ivory font-semibold mb-4">Программы</h3>
            <div className="space-y-2 text-sm">
              <Link href="/#program" className="block text-ivory/60 hover:text-ivory transition-colors">
                Один Дизайн Эмоций
              </Link>
              <Link href="/#program" className="block text-ivory/60 hover:text-ivory transition-colors">
                Квартальное сопровождение
              </Link>
              <Link href="/#program" className="block text-ivory/60 hover:text-ivory transition-colors">
                Год трансформации
              </Link>
            </div>
          </div>

          {/* О проекте */}
          <div>
            <h3 className="text-ivory font-semibold mb-4">О проекте</h3>
            <div className="space-y-2 text-sm">
              <Link href="/cases" className="block text-ivory/60 hover:text-ivory transition-colors">
                Кейсы
              </Link>
              <Link href="/georgiy-taktarov" className="block text-ivory/60 hover:text-ivory transition-colors">
                Об авторе
              </Link>
              <Link href="/#cta" className="block text-ivory/60 hover:text-ivory transition-colors">
                Подать заявку
              </Link>
            </div>
          </div>

          {/* Правовая информация */}
          <div>
            <h3 className="text-ivory font-semibold mb-4">Правовая информация</h3>
            <div className="space-y-2 text-sm">
              <Link href="/legal/privacy" className="block text-ivory/60 hover:text-ivory transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/legal/terms" className="block text-ivory/60 hover:text-ivory transition-colors">
                Условия использования
              </Link>
              <Link href="/legal/offer" className="block text-ivory/60 hover:text-ivory transition-colors">
                Публичная оферта
              </Link>
              <Link href="/legal/refund" className="block text-ivory/60 hover:text-ivory transition-colors">
                Возврат средств
              </Link>
            </div>
          </div>
        </div>

        {/* Блок "Мост" */}
        <div className="pt-8 border-t border-bronze/10 text-center mb-8">
          <p className="text-ivory/80 text-sm mb-2">
            Моя открытая методология и инструменты:
          </p>
          <Link 
            href="https://diaryofemotions.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-bronze hover:text-bronze-light transition-colors"
          >
            <span className="text-lg">→</span>
            <span className="font-medium">diaryofemotions.ru</span>
          </Link>
          <p className="text-ivory/50 text-xs mt-2">
            Бесплатный дневник эмоций и анализатор для самостоятельной работы
          </p>
        </div>

        {/* Копирайт и контакты */}
        <div className="pt-8 border-t border-bronze/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-ivory/60 text-sm text-center md:text-left">
              <p>© 2025 Георгий Тактаров. Design Emotion</p>
            </div>

            <div className="text-ivory/60 text-sm text-center md:text-right">
              <p>
                Email: <a href="mailto:hello@designemotion.ru" className="hover:text-ivory transition-colors">hello@designemotion.ru</a>
                {' | '}
                Telegram: <a href="https://t.me/taktarov" className="hover:text-ivory transition-colors" target="_blank" rel="noopener noreferrer">@taktarov</a>
              </p>
            </div>
          </div>

          {/* Информация о платежах (Юкасса) */}
          <div className="mt-6 pt-6 border-t border-bronze/10 text-center">
            <p className="text-ivory/50 text-xs mb-2">
              Оплата принимается через безопасный сервис ЮKassa
            </p>
            <p className="text-ivory/40 text-xs">
              Все платежи защищены по стандарту PCI DSS. Мы не храним данные ваших банковских карт.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
