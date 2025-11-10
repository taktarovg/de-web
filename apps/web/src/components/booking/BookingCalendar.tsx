'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingCalendarProps {
  onSlotSelect: (slot: { id: number; date: string; time: string }) => void;
}

export default function BookingCalendar({ onSlotSelect }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [slots, setSlots] = useState<Record<string, any[]>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Загрузка слотов для текущего месяца
  useEffect(() => {
    fetchSlots();
  }, [currentMonth]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const year = currentMonth.getFullYear();
      const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
      
      const response = await fetch(`/api/bookings?month=${year}-${month}`);
      const data = await response.json();
      
      if (data.success) {
        setSlots(data.data);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setLoading(false);
    }
  };

  // Получить дни месяца
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    // Padding start
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }
    
    // Days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  };

  const handleSlotClick = (slotId: number, date: string, time: string) => {
    onSlotSelect({ id: slotId, date, time });
  };

  const days = getDaysInMonth();
  const monthName = currentMonth.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });

  return (
    <div>
      {/* Навигация по месяцам */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-graphite/10 rounded transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h3 className="text-lg font-semibold text-graphite capitalize">
          {monthName}
        </h3>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-graphite/10 rounded transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Календарь */}
      <div className="mb-6">
        {/* Заголовки дней недели */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-graphite/60">
              {day}
            </div>
          ))}
        </div>

        {/* Дни */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} />;
            }

            const dateStr = day.toISOString().split('T')[0];
            const hasSlots = slots[dateStr] && slots[dateStr].some(s => s.available);
            const isSelected = selectedDate === dateStr;
            const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));

            return (
              <button
                key={dateStr}
                onClick={() => !isPast && hasSlots && handleDateClick(day)}
                disabled={isPast || !hasSlots}
                className={`
                  aspect-square p-2 rounded text-sm transition-all
                  ${isPast ? 'text-graphite/30 cursor-not-allowed' : ''}
                  ${hasSlots && !isPast ? 'hover:bg-bronze/20 cursor-pointer border-2 border-bronze/30' : ''}
                  ${!hasSlots && !isPast ? 'text-graphite/40' : ''}
                  ${isSelected ? 'bg-bronze text-white border-bronze' : ''}
                `}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Слоты времени для выбранной даты */}
      {selectedDate && slots[selectedDate] && (
        <div>
          <h4 className="font-semibold text-graphite mb-3">
            Доступные слоты на {new Date(selectedDate).toLocaleDateString('ru-RU')}:
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {slots[selectedDate].map((slot) => (
              <button
                key={slot.id}
                onClick={() => slot.available && handleSlotClick(slot.id, selectedDate, slot.time)}
                disabled={!slot.available}
                className={`
                  p-3 rounded border-2 text-sm font-medium transition-all
                  ${slot.available
                    ? 'border-midnight bg-midnight text-ivory hover:bg-midnight-hover cursor-pointer'
                    : 'border-graphite/20 text-graphite/40 line-through cursor-not-allowed'}
                `}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-8 text-graphite/60">
          Загрузка доступных дат...
        </div>
      )}
    </div>
  );
}
