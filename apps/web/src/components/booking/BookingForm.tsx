'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface BookingFormProps {
  sessionType: 'single' | 'quarter' | 'year';
  selectedSlot: { id: number; date: string; time: string } | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BookingForm({ sessionType, selectedSlot, onSuccess, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.name,
          clientEmail: formData.email,
          clientTelegram: formData.telegram,
          clientPhone: formData.phone,
          sessionType,
          slotId: selectedSlot?.id,
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || 'Произошла ошибка');
      }
    } catch (err) {
      setError('Ошибка соединения. Попробуйте снова.');
      console.error('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const prices = {
    single: '10 000',
    quarter: '60 000',
    year: '120 000',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Резюме */}
      {selectedSlot && (
        <div className="p-4 bg-bronze/10 rounded-lg border border-bronze/30">
          <p className="text-sm text-graphite/80">
            <strong>Дата:</strong> {new Date(selectedSlot.date).toLocaleDateString('ru-RU', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
          <p className="text-sm text-graphite/80">
            <strong>Время:</strong> {selectedSlot.time}
          </p>
          <p className="text-sm text-graphite/80">
            <strong>Стоимость:</strong> {prices[sessionType]} ₽
          </p>
        </div>
      )}

      {/* Имя */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-graphite mb-1">
          Имя и Фамилия <span className="text-bronze">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Иван Петров"
          className="w-full px-4 py-2 border border-graphite/20 rounded focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-graphite mb-1">
          Email <span className="text-bronze">*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="ivan@example.com"
          className="w-full px-4 py-2 border border-graphite/20 rounded focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze"
        />
      </div>

      {/* Telegram */}
      <div>
        <label htmlFor="telegram" className="block text-sm font-medium text-graphite mb-1">
          Telegram
        </label>
        <input
          type="text"
          id="telegram"
          value={formData.telegram}
          onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
          placeholder="@username"
          className="w-full px-4 py-2 border border-graphite/20 rounded focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze"
        />
      </div>

      {/* Телефон */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-graphite mb-1">
          Телефон
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+7 (999) 123-45-67"
          className="w-full px-4 py-2 border border-graphite/20 rounded focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze"
        />
      </div>

      {/* Заметки */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-graphite mb-1">
          Коротко о вашем запросе
        </label>
        <textarea
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Например: Хочу разобраться с выгоранием"
          className="w-full px-4 py-2 border border-graphite/20 rounded focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze resize-none"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Кнопки */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="flex-1 border-graphite/30 text-graphite hover:bg-graphite/5"
        >
          Отмена
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-midnight hover:bg-midnight-hover text-ivory disabled:opacity-50"
        >
          {isSubmitting ? 'Отправка...' : 'Забронировать'}
        </Button>
      </div>
    </form>
  );
}
