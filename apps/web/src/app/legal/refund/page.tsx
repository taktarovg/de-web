import { Header, Footer } from '@/components/layout';

export const metadata = {
  title: 'Возврат средств | Дизайн Эмоций',
  description: 'Политика возврата средств за услуги персонального сопровождения',
};

export default function RefundPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20 pb-20 bg-ivory">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-graphite mb-8">
            Политика возврата средств
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-graphite/90">
            
            <section>
              <p className="text-lg text-graphite/80">
                ИП Тактаров Георгий Викторович стремится обеспечить высокое качество услуг и прозрачные условия возврата средств. 
                Ниже описаны правила и процедуры для возврата оплаты за услуги персонального сопровождения.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-graphite mt-8 mb-4">1. Общие условия возврата</h2>
              <p>
                1.1. Возврат средств возможен только в случаях, предусмотренных настоящей политикой.
              </p>
              <p>
                1.2. Возврат осуществляется на банковскую карту или счет, с которого была произведена оплата.
              </p>
              <p>
                1.3. Срок возврата — до 10 рабочих дней с момента одобрения заявки.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-graphite mt-8 mb-4">2. Возврат за разовую сессию ("Один Дизайн Эмоций")</h2>
              
              <div className="bg-white p-6 rounded-lg border border-graphite/20 mb-4">
                <h3 className="text-xl font-semibold text-graphite mb-3">✅ Возврат возможен:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>До начала сессии:</strong> Полный возврат (100%) при отмене не менее чем за 24 часа до начала сессии.
                  </li>
                  <li>
                    <strong>Технические проблемы:</strong> Полный возврат, если сессия не состоялась по вине Исполнителя 
                    (технические неполадки, отсутствие связи и т.д.).
                  </li>
                </ul>
              </div>

              <div className="bg-bronze/5 p-6 rounded-lg border border-bronze/30">
                <h3 className="text-xl font-semibold text-graphite mb-3">❌ Возврат невозможен:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Отмена менее чем за 24 часа:</strong> При отмене сессии менее чем за 24 часа до начала, 
                    возврат не производится.
                  </li>
                  <li>
                    <strong>Неявка на сессию:</strong> При неявке Заказчика без предупреждения возврат не производится.
                  </li>
                  <li>
                    <strong>После завершения сессии:</strong> Если сессия состоялась и была проведена в полном объеме, 
                    возврат не производится.
                  </li>
                  <li>
                    <strong>Субъективная оценка:</strong> Возврат не производится, если Заказчик остался недоволен результатами 
                    после проведенной сессии (качество услуги оценивается объективными критериями выполнения обязательств).
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-graphite mt-8 mb-4">3. Возврат за долгосрочные программы</h2>
              
              <h3 className="text-xl font-semibold text-graphite mt-6 mb-3">Квартальное сопровождение (60,000 ₽, 9 сессий)</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>До начала программы:</strong> Полный возврат (100%) при отмене не менее чем за 48 часов до первой сессии.
                </li>
                <li>
                  <strong>После 1-й сессии:</strong> Возврат пропорционально не проведенным сессиям (за вычетом стоимости проведенной сессии: 60,000 / 9 = 6,667 ₽ за сессию).
                </li>
                <li>
                  <strong>После 3-х и более сессий:</strong> Возврат не производится, так как программа считается начатой и частично реализованной.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-graphite mt-6 mb-3">Год трансформации (120,000 ₽, 24 сессии)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>До начала программы:</strong> Полный возврат (100%) при отмене не менее чем за 72 часа до первой сессии.
                </li>
                <li>
                  <strong>После 1-2 сессий:</strong> Возврат пропорционально не проведенным сессиям (за вычетом стоимости проведенных сессий: 120,000 / 24 = 5,000 ₽ за сессию).
                </li>
                <li>
                  <strong>После 6-ти и более сессий:</strong> Возврат не производится, так как программа считается активно реализуемой.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-graphite mt-8 mb-4">4. Процедура оформления возврата</h2>
              <p>
                4.1. Для возврата средств Заказчик должен направить письменное заявление на email: 
                <a href="mailto:hello@designemotion.ru" className="text-bronze hover:underline ml-1">hello@designemotion.ru</a>
              </p>
              <p>
                4.2. В заявлении необходимо указать:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>ФИО Заказчика</li>
                <li>Дату оплаты и сумму платежа</li>
                <li>Причину возврата</li>
                <li>Реквизиты для возврата средств (номер карты или банковский счет)</li>
              </ul>
              <p>
                4.3. Исполнитель рассматривает заявление в течение 3 рабочих дней и направляет ответ на указанный email.
              </p>
              <p>
                4.4. При одобрении возврата средства зачисляются в течение 10 рабочих дней.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-graphite mt-8 mb-4">5. Исключения</h2>
              <p>
                5.1. Возврат не производится, если Заказчик нарушил условия договора оферты 
                (предоставил недостоверную информацию, проявлял агрессию, отказывался следовать рекомендациям и т.д.).
              </p>
              <p>
                5.2. Возврат не производится за сессии, которые были пропущены Заказчиком без уведомления.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-graphite mt-8 mb-4">6. Изменение условий</h2>
              <p>
                6.1. Исполнитель оставляет за собой право изменять условия возврата с обязательным уведомлением Заказчиков.
              </p>
              <p>
                6.2. Изменения не распространяются на уже оплаченные услуги.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-graphite mt-8 mb-4">7. Контакты</h2>
              <p>
                По всем вопросам, связанным с возвратом средств, обращайтесь:
              </p>
              <p className="mt-4">
                Email: <a href="mailto:hello@designemotion.ru" className="text-bronze hover:underline">hello@designemotion.ru</a><br />
                Telegram: <a href="https://t.me/taktarov" className="text-bronze hover:underline" target="_blank" rel="noopener noreferrer">@taktarov</a>
              </p>
            </section>

            <p className="text-sm text-graphite/60 mt-12">
              Дата публикации: 10 ноября 2025 г.
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
