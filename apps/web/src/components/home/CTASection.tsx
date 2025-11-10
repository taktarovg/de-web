'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contact: '',
    request: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      alert('Пожалуйста, дайте согласие на обработку данных');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          contact: formData.contact,
          request: formData.request,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          company: '',
          contact: '',
          request: '',
          consent: false
        });
      } else {
        setSubmitStatus('error');
        console.error('Error:', data.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cta" className="py-24 bg-graphite border-t-2 border-bronze/30">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ivory mb-6">
            Следующий шаг
          </h2>
          
          <div className="text-ivory/80 text-lg leading-relaxed space-y-4">
            <p>
              Работа начинается с платной стратегической сессии.
            </p>
            
            <p>
              Это не бесплатная консультация, на которой я "попробую вам 
              что-то продать". Это полноценный 90-минутный аудит вашей 
              внутренней системы, который сам по себе окупится в тот же день.
            </p>
            
            <p>
              Вы уйдёте с конкретным планом действий, новым пониманием 
              своей ситуации и ясностью в том, что делать дальше — 
              продолжить работу со мной или действовать самостоятельно.
            </p>
          </div>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Имя */}
          <div>
            <label htmlFor="name" className="block text-ivory mb-2 font-medium">
              Имя и Фамилия <span className="text-bronze">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Иван Петров"
              className="w-full px-4 py-3 bg-ivory/10 border border-ivory/20 rounded text-ivory placeholder:text-ivory/50 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze transition-colors"
            />
          </div>

          {/* Компания */}
          <div>
            <label htmlFor="company" className="block text-ivory mb-2 font-medium">
              Компания / Должность
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="CEO в Tech Startup"
              className="w-full px-4 py-3 bg-ivory/10 border border-ivory/20 rounded text-ivory placeholder:text-ivory/50 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze transition-colors"
            />
          </div>

          {/* Контакт */}
          <div>
            <label htmlFor="contact" className="block text-ivory mb-2 font-medium">
              Контакт (Telegram или Email) <span className="text-bronze">*</span>
            </label>
            <input
              type="text"
              id="contact"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="@username или email@example.com"
              className="w-full px-4 py-3 bg-ivory/10 border border-ivory/20 rounded text-ivory placeholder:text-ivory/50 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze transition-colors"
            />
          </div>

          {/* Запрос */}
          <div>
            <label htmlFor="request" className="block text-ivory mb-2 font-medium">
              Ваш главный запрос одним предложением <span className="text-bronze">*</span>
            </label>
            <textarea
              id="request"
              required
              rows={3}
              value={formData.request}
              onChange={(e) => setFormData({ ...formData, request: e.target.value })}
              placeholder='Например: "Хочу научиться принимать решения без страха"'
              className="w-full px-4 py-3 bg-ivory/10 border border-ivory/20 rounded text-ivory placeholder:text-ivory/50 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze transition-colors resize-none"
            />
          </div>

          {/* Согласие */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 w-4 h-4 accent-bronze"
            />
            <label htmlFor="consent" className="text-ivory/80 text-sm">
              Я согласен с{' '}
              <a href="/legal/privacy" className="text-bronze hover:underline" target="_blank">
                политикой конфиденциальности
              </a>
            </label>
          </div>

          {/* Кнопка отправки */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-midnight hover:bg-midnight-hover text-ivory text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-xl"
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </Button>

          {/* Статус отправки */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-bronze/20 border border-bronze rounded text-ivory text-center">
              ✓ Заявка успешно отправлена! Я отвечу в течение 24 часов.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-900/20 border border-red-500 rounded text-ivory text-center">
              ✗ Произошла ошибка. Попробуйте снова или напишите напрямую в Telegram: @taktarov
            </div>
          )}

          {/* Текст под кнопкой */}
          <p className="text-ivory/60 text-sm text-center">
            Я отвечу в течение 24 часов и предложу 2-3 варианта времени 
            для нашей первой сессии.
          </p>
        </form>
      </div>
    </section>
  );
}
