'use client';

import { useState } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LeadFormPopupProps {
  source?: string; // 'beauty-leaders' | 'navigator-2026' | 'dizayn-emotsiy'
  buttonText?: string;
  buttonClassName?: string;
}

export default function LeadFormPopup({ 
  source = 'landing',
  buttonText = 'Оставить заявку',
  buttonClassName = 'bg-bronze hover:bg-bronze-dark text-graphite font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:shadow-xl'
}: LeadFormPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: null,
          contact: formData.contact,
          request: formData.message || `Заявка с лендинга: ${source}`,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        
        // Yandex Metrika goal
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(105219459, 'reachGoal', 'lead_submit');
        }
        
        // Google Analytics event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'engagement',
            event_label: source,
          });
        }
        
        // Reset after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
          setFormData({ name: '', contact: '', message: '' });
        }, 3000);
      } else {
        alert('Ошибка отправки. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={buttonClassName}
        size="lg"
      >
        {buttonText}
      </Button>

      {/* Popup Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative bg-ivory rounded-xl shadow-2xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-graphite/40 hover:text-graphite transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {isSuccess ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-bronze/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-bronze" />
                </div>
                <h3 className="text-2xl font-bold text-graphite mb-2">
                  Заявка отправлена!
                </h3>
                <p className="text-graphite/70">
                  Я свяжусь с вами в течение 24 часов
                </p>
              </div>
            ) : (
              /* Form */
              <>
                <h3 className="text-2xl font-bold text-graphite mb-2">
                  Запись на сессию
                </h3>
                <p className="text-graphite/70 mb-6 text-sm">
                  Оставьте контакты — я свяжусь для уточнения деталей
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Имя */}
                  <div>
                    <label className="block text-sm font-medium text-graphite mb-1">
                      Ваше имя <span className="text-bronze">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Как к вам обращаться?"
                      className="w-full px-4 py-3 border border-graphite/20 rounded-lg focus:ring-2 focus:ring-bronze focus:border-transparent bg-white"
                    />
                  </div>

                  {/* Контакт */}
                  <div>
                    <label className="block text-sm font-medium text-graphite mb-1">
                      Telegram или Email <span className="text-bronze">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="@username или email@example.com"
                      className="w-full px-4 py-3 border border-graphite/20 rounded-lg focus:ring-2 focus:ring-bronze focus:border-transparent bg-white"
                    />
                  </div>

                  {/* Сообщение (опционально) */}
                  <div>
                    <label className="block text-sm font-medium text-graphite mb-1">
                      Коротко о ситуации (опционально)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="С какой ситуацией хотите поработать?"
                      rows={3}
                      className="w-full px-4 py-3 border border-graphite/20 rounded-lg focus:ring-2 focus:ring-bronze focus:border-transparent resize-none bg-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-bronze hover:bg-bronze-dark disabled:bg-graphite/30 text-graphite font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      'Отправить заявку'
                    )}
                  </button>

                  {/* Privacy Note */}
                  <p className="text-xs text-graphite/50 text-center">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a href="/legal/privacy" target="_blank" className="text-bronze hover:underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
