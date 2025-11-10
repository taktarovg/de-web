'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingCalendar from './BookingCalendar';
import BookingForm from './BookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSessionType?: 'single' | 'quarter' | 'year';
}

export default function BookingModal({ isOpen, onClose, defaultSessionType = 'single' }: BookingModalProps) {
  const [step, setStep] = useState<'type' | 'calendar' | 'form' | 'success'>('type');
  const [sessionType, setSessionType] = useState<'single' | 'quarter' | 'year'>(defaultSessionType);
  const [selectedSlot, setSelectedSlot] = useState<{ id: number; date: string; time: string } | null>(null);

  if (!isOpen) return null;

  const handleSessionTypeSelect = (type: 'single' | 'quarter' | 'year') => {
    setSessionType(type);
    if (type === 'single') {
      setStep('calendar');
    } else {
      setStep('form');
    }
  };

  const handleSlotSelect = (slot: { id: number; date: string; time: string }) => {
    setSelectedSlot(slot);
    setStep('form');
  };

  const handleBookingSuccess = () => {
    setStep('success');
    setTimeout(() => {
      onClose();
      resetModal();
    }, 3000);
  };

  const resetModal = () => {
    setStep('type');
    setSessionType(defaultSessionType);
    setSelectedSlot(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite/80 backdrop-blur-sm">
      <div className="relative bg-ivory rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-graphite/60 hover:text-graphite transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          
          {/* Step 1: Выбор типа сессии */}
          {step === 'type' && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-graphite mb-6">
                Выберите формат работы
              </h2>

              <div className="space-y-4">
                {[
                  { type: 'single' as const, title: 'Один Дизайн Эмоций', price: '10 000 ₽', desc: '60-90 минут' },
                  { type: 'quarter' as const, title: 'Квартал', price: '60 000 ₽', desc: '3 месяца | 9 сессий' },
                  { type: 'year' as const, title: 'Год трансформации', price: '120 000 ₽', desc: '12 месяцев | 24 сессии' },
                ].map((option) => (
                  <button
                    key={option.type}
                    onClick={() => handleSessionTypeSelect(option.type)}
                    className="w-full p-4 border-2 border-graphite/20 rounded-lg hover:border-bronze hover:bg-bronze/5 transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-graphite text-lg">{option.title}</h3>
                        <p className="text-sm text-graphite/60">{option.desc}</p>
                      </div>
                      <span className="text-2xl font-bold text-bronze">{option.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Календарь (только для single) */}
          {step === 'calendar' && (
            <div>
              <button
                onClick={() => setStep('type')}
                className="text-graphite/60 hover:text-graphite mb-4 text-sm"
              >
                ← Назад
              </button>
              
              <h2 className="text-2xl md:text-3xl font-bold text-graphite mb-6">
                Выберите дату и время
              </h2>

              <BookingCalendar onSlotSelect={handleSlotSelect} />
            </div>
          )}

          {/* Step 3: Форма контактов */}
          {step === 'form' && (
            <div>
              <button
                onClick={() => setStep(sessionType === 'single' ? 'calendar' : 'type')}
                className="text-graphite/60 hover:text-graphite mb-4 text-sm"
              >
                ← Назад
              </button>

              <h2 className="text-2xl md:text-3xl font-bold text-graphite mb-6">
                Ваши контактные данные
              </h2>

              <BookingForm
                sessionType={sessionType}
                selectedSlot={selectedSlot}
                onSuccess={handleBookingSuccess}
                onCancel={handleClose}
              />
            </div>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-bronze/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✓</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-graphite mb-4">
                Готово!
              </h2>
              
              <p className="text-graphite/80 mb-2">
                {sessionType === 'single'
                  ? 'Ваша сессия успешно забронирована'
                  : 'Ваша заявка успешно отправлена'}
              </p>
              
              <p className="text-sm text-graphite/60">
                Подтверждение отправлено на ваш email
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
