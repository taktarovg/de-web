import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Политика конфиденциальности - Дизайн Эмоций',
  description: 'Политика обработки персональных данных в соответствии с ФЗ-152'
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cloud">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-calm-500" />
            <span className="font-bold text-xl text-ocean-500">Дизайн Эмоций</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-calm-500 text-calm-600 hover:bg-calm-50">
              На главную
            </Button>
          </Link>
        </nav>
      </header>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-ocean">
            
            <h1 className="text-4xl font-bold text-ocean-500 mb-2">Политика конфиденциальности</h1>
            <p className="text-ocean-400 mb-8">
              <strong>Дата вступления в силу:</strong> 27 октября 2025 года<br/>
              <strong>Последнее обновление:</strong> 27 октября 2025 года
            </p>

            <div className="space-y-8 text-ocean-400">
              
              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">1. Общие положения</h2>
                <p className="leading-relaxed">
                  1.1. Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок 
                  обработки и защиты персональных данных пользователей сервиса "Дизайн Эмоций" 
                  (далее — «Сервис»), включая Telegram-бота, веб-сайт designemotion.ru и административную панель.
                </p>
                <p className="leading-relaxed">
                  1.2. Оператором персональных данных является <strong className="text-ocean-500">Индивидуальный предприниматель 
                  Тактаров Георгий Викторович</strong> (ОГРНИП 325547600141358, ИНН 244400059945), 
                  далее — «Оператор».
                </p>
                <p className="leading-relaxed">
                  1.3. Обработка персональных данных осуществляется в соответствии с Федеральным законом 
                  от 27.07.2006 № 152-ФЗ «О персональных данных» и действующим законодательством Российской Федерации.
                </p>
                <p className="leading-relaxed">
                  1.4. Используя Сервис, вы подтверждаете свое согласие с условиями настоящей Политики. 
                  Если вы не согласны с какими-либо положениями, пожалуйста, не используйте Сервис.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">2. Какие данные мы собираем</h2>
                
                <h3 className="text-xl font-semibold text-ocean-500 mb-2">2.1. Данные, предоставляемые автоматически:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Telegram ID (уникальный идентификатор в Telegram)</li>
                  <li>Имя пользователя (username) в Telegram, если указано</li>
                  <li>Имя и фамилия из профиля Telegram</li>
                  <li>Дата и время первого использования Сервиса</li>
                  <li>Язык интерфейса</li>
                </ul>

                <h3 className="text-xl font-semibold text-ocean-500 mb-2 mt-4">2.2. Данные, предоставляемые пользователем:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Эмоциональные состояния и анализы (выбранные эмоции, уровни по шкале Хокинса)</li>
                  <li>Текстовые описания ситуаций и эмоций (по желанию пользователя)</li>
                  <li>Настройки часового пояса для напоминаний</li>
                  <li>Прогресс прохождения курса "Дневник Эмоций"</li>
                  <li>Статистика использования Сервиса</li>
                </ul>

                <h3 className="text-xl font-semibold text-ocean-500 mb-2 mt-4">2.3. Технические данные:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP-адрес при доступе к веб-сайту</li>
                  <li>Тип устройства и операционной системы</li>
                  <li>Тип браузера</li>
                  <li>Данные cookies (при использовании веб-сайта)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">3. Цели обработки данных</h2>
                <p className="leading-relaxed">
                  Мы обрабатываем ваши персональные данные для следующих целей:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Предоставление услуг Сервиса (анализ эмоций, статистика, курс)</li>
                  <li>Идентификация пользователя в системе</li>
                  <li>Отправка напоминаний и уведомлений (с вашего согласия)</li>
                  <li>Улучшение качества Сервиса и разработка новых функций</li>
                  <li>Статистический анализ использования Сервиса (обезличенные данные)</li>
                  <li>Связь с пользователем по вопросам использования Сервиса</li>
                  <li>Исполнение договорных обязательств (при оплате услуг)</li>
                  <li>Соблюдение требований законодательства РФ</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">4. Правовые основания обработки</h2>
                <p className="leading-relaxed">
                  Обработка персональных данных осуществляется на основании:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Вашего согласия на обработку персональных данных (ст. 9 ФЗ-152)</li>
                  <li>Необходимости исполнения договора на оказание услуг (ст. 6 ФЗ-152)</li>
                  <li>Законных интересов Оператора (улучшение Сервиса, статистика)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">5. Срок хранения данных</h2>
                <p className="leading-relaxed">
                  5.1. Персональные данные хранятся в течение всего периода использования вами Сервиса.
                </p>
                <p className="leading-relaxed">
                  5.2. После удаления учетной записи (команда /delete_me в боте) ваши персональные данные 
                  удаляются в течение 30 дней.
                </p>
                <p className="leading-relaxed">
                  5.3. Статистические данные (обезличенные) могут храниться бессрочно для анализа и улучшения Сервиса.
                </p>
                <p className="leading-relaxed">
                  5.4. При оплате услуг данные, необходимые для исполнения требований налогового законодательства, 
                  хранятся в течение 5 лет с момента оказания услуги.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">6. Передача данных третьим лицам</h2>
                <p className="leading-relaxed">
                  6.1. Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, предусмотренных 
                  законодательством РФ или настоящей Политикой.
                </p>
                <p className="leading-relaxed">
                  6.2. Данные могут быть переданы следующим категориям получателей:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Telegram Messenger LLP</strong> — для работы Telegram-бота (передача сообщений)</li>
                  <li><strong>Хостинг-провайдер</strong> — для хранения данных на серверах (PostgreSQL)</li>
                  <li><strong>Платёжные системы</strong> — при оплате услуг (Юкасса, банковские реквизиты)</li>
                  <li><strong>Государственные органы</strong> — по официальным запросам в соответствии с законодательством РФ</li>
                </ul>
                <p className="leading-relaxed">
                  6.3. Все получатели обязаны обеспечить конфиденциальность и безопасность переданных данных.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">7. Защита данных</h2>
                <p className="leading-relaxed">
                  7.1. Мы применяем организационные и технические меры для защиты ваших данных от неправомерного доступа, 
                  изменения, раскрытия или уничтожения:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Шифрование данных при передаче (HTTPS, TLS)</li>
                  <li>Хранение паролей в зашифрованном виде</li>
                  <li>Ограничение доступа к персональным данным</li>
                  <li>Регулярное резервное копирование данных</li>
                  <li>Мониторинг безопасности инфраструктуры</li>
                </ul>
                <p className="leading-relaxed">
                  7.2. Доступ к персональным данным имеют только уполномоченные лица, обязанные соблюдать конфиденциальность.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">8. Ваши права</h2>
                <p className="leading-relaxed">
                  В соответствии с ФЗ-152 вы имеете следующие права:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Право на доступ</strong> — получить информацию о ваших персональных данных</li>
                  <li><strong>Право на исправление</strong> — исправить неточные или неполные данные</li>
                  <li><strong>Право на удаление</strong> — удалить ваши данные (команда /delete_me)</li>
                  <li><strong>Право на ограничение обработки</strong> — ограничить обработку данных в определённых случаях</li>
                  <li><strong>Право на отзыв согласия</strong> — отозвать согласие на обработку в любое время</li>
                  <li><strong>Право на возражение</strong> — возразить против обработки данных</li>
                  <li><strong>Право на жалобу</strong> — подать жалобу в Роскомнадзор</li>
                </ul>
                <p className="leading-relaxed">
                  Для реализации ваших прав свяжитесь с нами: <a href="https://t.me/taktarov" className="text-calm-500 hover:underline">@taktarov</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">9. Cookies и аналитика</h2>
                <p className="leading-relaxed">
                  9.1. Мы используем cookies для улучшения работы веб-сайта и анализа посещаемости.
                </p>
                <p className="leading-relaxed">
                  9.2. Вы можете отключить cookies в настройках вашего браузера, но это может ограничить функциональность сайта.
                </p>
                <p className="leading-relaxed">
                  9.3. Мы не используем сторонние аналитические сервисы (Google Analytics, Яндекс.Метрика) для сбора данных.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">10. Дети</h2>
                <p className="leading-relaxed">
                  10.1. Сервис предназначен для лиц старше 18 лет.
                </p>
                <p className="leading-relaxed">
                  10.2. Мы не собираем персональные данные детей осознанно. Если вам стало известно, что ребёнок 
                  предоставил нам свои данные, пожалуйста, свяжитесь с нами для удаления этих данных.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">11. Изменения в Политике</h2>
                <p className="leading-relaxed">
                  11.1. Мы оставляем за собой право вносить изменения в настоящую Политику.
                </p>
                <p className="leading-relaxed">
                  11.2. О существенных изменениях мы уведомим вас через Telegram-бот или email (если указан).
                </p>
                <p className="leading-relaxed">
                  11.3. Актуальная версия Политики всегда доступна по адресу: designemotion.ru/legal/privacy
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">12. Контактная информация</h2>
                <p className="leading-relaxed">
                  Если у вас есть вопросы по Политике конфиденциальности или вы хотите реализовать свои права, 
                  свяжитесь с нами:
                </p>
                <div className="bg-calm-50 p-4 rounded-lg mt-4">
                  <p><strong className="text-ocean-500">ИП Тактаров Георгий Викторович</strong></p>
                  <p>ОГРНИП: 325547600141358</p>
                  <p>ИНН: 244400059945</p>
                  <p>Telegram: <a href="https://t.me/taktarov" className="text-calm-500 hover:underline">@taktarov</a></p>
                  <p>Email: hello@designemotion.ru</p>
                </div>
              </section>

              <section className="border-t border-slate-200 pt-8">
                <p className="text-sm text-ocean-400 italic">
                  Настоящая Политика конфиденциальности разработана в соответствии с требованиями 
                  Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных», 
                  Постановления Правительства РФ от 01.11.2012 № 1119 и других нормативных актов РФ.
                </p>
              </section>

            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-ocean-400">
          <p>© 2025 ИП Тактаров Георгий Викторович. Все права защищены.</p>
          <div className="mt-4 flex justify-center gap-6 flex-wrap">
            <Link href="/legal/terms" className="hover:text-calm-500">Пользовательское соглашение</Link>
            <Link href="/legal/offer" className="hover:text-calm-500">Договор оферты</Link>
            <Link href="/legal/refund" className="hover:text-calm-500">Возврат средств</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
