import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Договор оферты - Дизайн Эмоций',
  description: 'Публичная оферта на оказание услуг по развитию эмоционального интеллекта'
}

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-cloud">
      {/* Header */}
      <header className="border-t border-slate-200 bg-white">
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
            
            <h1 className="text-4xl font-bold text-ocean-500 mb-2">Договор оферты</h1>
            <p className="text-lg text-ocean-500 mb-4">
              Публичная оферта на оказание услуг по развитию эмоционального интеллекта
            </p>
            <p className="text-ocean-400 mb-8">
              <strong>Дата вступления в силу:</strong> 27 октября 2025 года<br/>
              <strong>Последнее обновление:</strong> 27 октября 2025 года
            </p>

            <div className="space-y-8 text-ocean-400">
              
              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">1. Общие положения</h2>
                <p className="leading-relaxed">
                  1.1. Настоящий документ является публичной офертой (предложением) Индивидуального 
                  предпринимателя Тактарова Георгия Викторовича (ОГРНИП 325547600141358, ИНН 244400059945), 
                  далее — «Исполнитель», заключить договор на оказание услуг на изложенных ниже условиях.
                </p>
                <p className="leading-relaxed">
                  1.2. В соответствии с пунктом 2 статьи 437 Гражданского кодекса Российской Федерации 
                  данный документ является публичной офертой, и в случае принятия изложенных ниже условий 
                  физическое лицо, производящее акцепт этой оферты, осуществляет оплату Услуг Исполнителя 
                  в соответствии с условиями настоящего Договора. В соответствии с пунктом 3 статьи 438 
                  Гражданского кодекса Российской Федерации оплата Услуг Заказчиком является акцептом оферты, 
                  что считается равносильным заключению Договора на условиях, изложенных в оферте.
                </p>
                <p className="leading-relaxed">
                  1.3. Местом заключения настоящего Договора является город Новосибирск, Российская Федерация.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">2. Термины и определения</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-ocean-500">Оферта</strong> — публичное предложение Исполнителя, 
                  адресованное неопределённому кругу лиц, заключить договор оказания услуг на условиях, 
                  содержащихся в настоящем Договоре</li>
                  <li><strong className="text-ocean-500">Акцепт</strong> — полное и безоговорочное принятие 
                  Заказчиком условий Договора путём оплаты Услуг</li>
                  <li><strong className="text-ocean-500">Исполнитель</strong> — ИП Тактаров Георгий Викторович</li>
                  <li><strong className="text-ocean-500">Заказчик</strong> — физическое лицо, достигшее 18 лет, 
                  принявшее условия настоящего Договора и оплатившее Услуги</li>
                  <li><strong className="text-ocean-500">Услуги</strong> — индивидуальные сессии по методу 
                  "Дизайн Эмоций", консультации, образовательные программы</li>
                  <li><strong className="text-ocean-500">Сервис</strong> — Telegram-бот @EmotionDesignBot 
                  и веб-сайт designemotion.ru</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">3. Предмет Договора</h2>
                <p className="leading-relaxed">
                  3.1. Исполнитель обязуется оказать Заказчику Услуги по развитию эмоционального интеллекта 
                  по методу "Дизайн Эмоций", а Заказчик обязуется принять и оплатить эти Услуги.
                </p>
                <p className="leading-relaxed">
                  3.2. Перечень и стоимость Услуг:
                </p>
                <div className="bg-calm-50 p-4 rounded-lg my-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-calm-200">
                        <th className="text-left py-2">Услуга</th>
                        <th className="text-left py-2">Длительность</th>
                        <th className="text-right py-2">Стоимость</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-calm-100">
                        <td className="py-2">Индивидуальная сессия</td>
                        <td className="py-2">90 минут</td>
                        <td className="text-right py-2">5 000 ₽</td>
                      </tr>
                      <tr className="border-b border-calm-100">
                        <td className="py-2">Пакет из 5 сессий</td>
                        <td className="py-2">5 × 90 минут</td>
                        <td className="text-right py-2">20 000 ₽</td>
                      </tr>
                      <tr>
                        <td className="py-2">Курс "Дневник Эмоций"</td>
                        <td className="py-2">30 дней</td>
                        <td className="text-right py-2">Бесплатно</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="leading-relaxed">
                  3.3. Исполнитель вправе изменять стоимость Услуг в одностороннем порядке. 
                  Изменение стоимости не распространяется на Услуги, оплаченные до момента изменения цены.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">4. Порядок оказания Услуг</h2>
                <p className="leading-relaxed">
                  4.1. Услуги оказываются в дистанционном формате (онлайн) через Zoom, Telegram или другие 
                  согласованные средства связи.
                </p>
                <p className="leading-relaxed">
                  4.2. Для записи на сессию Заказчик связывается с Исполнителем через Telegram (@taktarov) 
                  и согласовывает дату и время.
                </p>
                <p className="leading-relaxed">
                  4.3. После согласования времени Исполнитель направляет Заказчику реквизиты для оплаты.
                </p>
                <p className="leading-relaxed">
                  4.4. Оплата Услуг производится до момента оказания Услуги (предоплата 100%).
                </p>
                <p className="leading-relaxed">
                  4.5. После получения оплаты Исполнитель направляет Заказчику ссылку на онлайн-встречу.
                </p>
                <p className="leading-relaxed">
                  4.6. Сессия проводится в согласованное время. Длительность сессии — 90 минут.
                </p>
                <p className="leading-relaxed">
                  4.7. По согласованию с Заказчиком сессия может быть записана для последующего 
                  предоставления записи Заказчику.
                </p>
                <p className="leading-relaxed">
                  4.8. При покупке пакета из 5 сессий срок использования пакета составляет 6 месяцев 
                  с момента оплаты. Неиспользованные сессии по истечении срока сгорают.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">5. Порядок расчётов</h2>
                <p className="leading-relaxed">
                  5.1. Оплата Услуг производится одним из следующих способов:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Банковский перевод на карту (реквизиты высылаются индивидуально)</li>
                  <li>Через платёжную систему Юкасса (при наличии)</li>
                  <li>Другие способы по согласованию с Исполнителем</li>
                </ul>
                <p className="leading-relaxed">
                  5.2. Оплата считается произведённой с момента зачисления денежных средств 
                  на расчётный счёт или карту Исполнителя.
                </p>
                <p className="leading-relaxed">
                  5.3. Валюта расчётов — российский рубль (RUB).
                </p>
                <p className="leading-relaxed">
                  5.4. Исполнитель выдаёт Заказчику кассовый чек в электронной форме в соответствии 
                  с требованиями ФЗ-54 "О применении контрольно-кассовой техники".
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">6. Права и обязанности Исполнителя</h2>
                
                <h3 className="text-xl font-semibold text-ocean-500 mb-2">6.1. Исполнитель обязуется:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Оказать Услуги надлежащего качества</li>
                  <li>Провести сессию в согласованное время</li>
                  <li>Соблюдать конфиденциальность информации, полученной в ходе сессии</li>
                  <li>Предоставить запись сессии (при согласовании)</li>
                  <li>Выдать кассовый чек</li>
                </ul>

                <h3 className="text-xl font-semibold text-ocean-500 mb-2 mt-4">6.2. Исполнитель имеет право:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Отказать в оказании Услуг без объяснения причин (с возвратом оплаты)</li>
                  <li>Изменить время сессии по согласованию с Заказчиком</li>
                  <li>Привлекать третьих лиц для оказания Услуг</li>
                  <li>Прекратить оказание Услуг в случае некорректного поведения Заказчика</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">7. Права и обязанности Заказчика</h2>
                
                <h3 className="text-xl font-semibold text-ocean-500 mb-2">7.1. Заказчик обязуется:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Оплатить Услуги в полном объёме до момента их оказания</li>
                  <li>Явиться на сессию в согласованное время</li>
                  <li>Обеспечить стабильное интернет-соединение и техническую возможность для онлайн-встречи</li>
                  <li>Уведомить Исполнителя о переносе или отмене сессии не менее чем за 24 часа</li>
                  <li>Соблюдать правила взаимодействия и этикет</li>
                </ul>

                <h3 className="text-xl font-semibold text-ocean-500 mb-2 mt-4">7.2. Заказчик имеет право:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Получить Услуги надлежащего качества</li>
                  <li>Перенести сессию (при уведомлении за 24 часа)</li>
                  <li>Получить запись сессии (по согласованию)</li>
                  <li>Запросить возврат средств в соответствии с <Link href="/legal/refund" className="text-calm-500 hover:underline">Политикой возврата</Link></li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">8. Ответственность сторон</h2>
                <p className="leading-relaxed">
                  8.1. За неисполнение или ненадлежащее исполнение обязательств по настоящему Договору 
                  Стороны несут ответственность в соответствии с законодательством РФ.
                </p>
                <p className="leading-relaxed">
                  8.2. Исполнитель не несёт ответственности за:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Результаты применения полученных знаний и рекомендаций</li>
                  <li>Технические проблемы на стороне Заказчика (отсутствие интернета, неисправность устройства)</li>
                  <li>Неявку Заказчика на сессию без предварительного уведомления</li>
                </ul>
                <p className="leading-relaxed">
                  8.3. В случае неявки Заказчика на сессию без уведомления за 24 часа денежные средства 
                  не возвращаются, сессия считается проведённой.
                </p>
                <p className="leading-relaxed">
                  8.4. Услуги Исполнителя не являются медицинской или психотерапевтической помощью. 
                  При наличии психических расстройств Заказчик обязан обратиться к квалифицированному 
                  специалисту (психиатру, психотерапевту).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">9. Конфиденциальность</h2>
                <p className="leading-relaxed">
                  9.1. Исполнитель обязуется сохранять конфиденциальность информации, полученной 
                  в ходе оказания Услуг.
                </p>
                <p className="leading-relaxed">
                  9.2. Персональные данные Заказчика обрабатываются в соответствии с 
                  <Link href="/legal/privacy" className="text-calm-500 hover:underline"> Политикой конфиденциальности</Link>.
                </p>
                <p className="leading-relaxed">
                  9.3. Исполнитель вправе использовать обезличенные данные (без указания имени и других 
                  идентифицирующих данных) для статистики, обучения и улучшения методологии.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">10. Возврат денежных средств</h2>
                <p className="leading-relaxed">
                  10.1. Возврат денежных средств осуществляется в соответствии с 
                  <Link href="/legal/refund" className="text-calm-500 hover:underline"> Политикой возврата средств</Link>.
                </p>
                <p className="leading-relaxed">
                  10.2. Заказчик имеет право на возврат 100% оплаты при отмене сессии за 24 часа и более.
                </p>
                <p className="leading-relaxed">
                  10.3. В случае неудовлетворённости качеством Услуги Заказчик может запросить возврат 
                  в течение 7 дней после сессии.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">11. Разрешение споров</h2>
                <p className="leading-relaxed">
                  11.1. Все споры разрешаются путём переговоров.
                </p>
                <p className="leading-relaxed">
                  11.2. До обращения в суд Заказчик направляет претензию в письменной форме 
                  на email: hello@designemotion.ru или через Telegram: @taktarov
                </p>
                <p className="leading-relaxed">
                  11.3. Срок рассмотрения претензии — 30 дней с момента получения.
                </p>
                <p className="leading-relaxed">
                  11.4. При недостижении согласия споры передаются в суд по месту нахождения Исполнителя 
                  (г. Новосибирск) в соответствии с законодательством РФ.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">12. Срок действия и изменение Договора</h2>
                <p className="leading-relaxed">
                  12.1. Настоящий Договор вступает в силу с момента акцепта Оферты (оплаты Услуг) 
                  и действует до полного исполнения обязательств Сторонами.
                </p>
                <p className="leading-relaxed">
                  12.2. Исполнитель вправе вносить изменения в условия Договора в одностороннем порядке.
                </p>
                <p className="leading-relaxed">
                  12.3. Изменения вступают в силу с момента публикации новой редакции на сайте 
                  designemotion.ru/legal/offer
                </p>
                <p className="leading-relaxed">
                  12.4. Изменения не распространяются на Услуги, оплаченные до момента внесения изменений.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-ocean-500 mb-3">13. Реквизиты Исполнителя</h2>
                <div className="bg-calm-50 p-4 rounded-lg">
                  <p><strong className="text-ocean-500">Индивидуальный предприниматель</strong></p>
                  <p><strong className="text-ocean-500">Тактаров Георгий Викторович</strong></p>
                  <p className="mt-2">ОГРНИП: 325547600141358</p>
                  <p>ИНН: 244400059945</p>
                  <p>Дата регистрации: 28 августа 2025 года</p>
                  <p className="mt-2">Адрес регистрации: Новосибирская область, г. Новосибирск</p>
                  <p className="mt-2">Telegram: <a href="https://t.me/taktarov" className="text-calm-500 hover:underline">@taktarov</a></p>
                  <p>Email: hello@designemotion.ru</p>
                  <p>Сайт: designemotion.ru</p>
                </div>
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
            <Link href="/legal/privacy" className="hover:text-calm-500">Политика конфиденциальности</Link>
            <Link href="/legal/terms" className="hover:text-calm-500">Пользовательское соглашение</Link>
            <Link href="/legal/refund" className="hover:text-calm-500">Возврат средств</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
