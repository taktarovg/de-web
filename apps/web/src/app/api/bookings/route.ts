import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@ecosystem/database';

// GET /api/bookings - получить доступные слоты
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date'); // YYYY-MM-DD
    const month = searchParams.get('month'); // YYYY-MM

    let slots;

    if (date) {
      // Получить слоты для конкретной даты
      slots = await prisma.availableSlot.findMany({
        where: {
          slotDate: new Date(date),
          isAvailable: true,
        },
        orderBy: { slotTime: 'asc' },
      });

      return NextResponse.json({
        success: true,
        data: slots.map(slot => ({
          id: slot.id,
          date: slot.slotDate.toISOString().split('T')[0],
          time: slot.slotTime.toISOString().split('T')[1].substring(0, 5),
          duration: slot.duration,
          available: slot.currentBookings < slot.maxBookings,
        })),
      });
    }

    if (month) {
      // Получить все слоты для месяца (для календаря)
      const [year, monthNum] = month.split('-');
      const startDate = new Date(`${year}-${monthNum}-01`);
      const endDate = new Date(parseInt(year), parseInt(monthNum), 0); // последний день месяца

      slots = await prisma.availableSlot.findMany({
        where: {
          slotDate: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: [{ slotDate: 'asc' }, { slotTime: 'asc' }],
      });

      // Группируем по датам
      const grouped: Record<string, any[]> = {};
      slots.forEach(slot => {
        const dateKey = slot.slotDate.toISOString().split('T')[0];
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push({
          id: slot.id,
          time: slot.slotTime.toISOString().split('T')[1].substring(0, 5),
          duration: slot.duration,
          available: slot.currentBookings < slot.maxBookings,
        });
      });

      return NextResponse.json({
        success: true,
        data: grouped,
      });
    }

    // По умолчанию - текущий месяц
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return GET(new NextRequest(`${request.url}?month=${currentMonth}`));

  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка при получении слотов' },
      { status: 500 }
    );
  }
}

// POST /api/bookings - создать бронирование
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      clientName,
      clientEmail,
      clientTelegram,
      clientPhone,
      sessionType,
      slotId,
      notes,
    } = body;

    // Валидация
    if (!clientName || !clientEmail || !sessionType) {
      return NextResponse.json(
        { success: false, error: 'Заполните все обязательные поля' },
        { status: 400 }
      );
    }

    // Валидация email
    if (!clientEmail.includes('@') || !clientEmail.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Укажите корректный email' },
        { status: 400 }
      );
    }

    // Для single сессии нужен slotId
    if (sessionType === 'single' && !slotId) {
      return NextResponse.json(
        { success: false, error: 'Выберите дату и время сессии' },
        { status: 400 }
      );
    }

    // Определяем цену
    const prices: Record<string, number> = {
      single: 10000,
      quarter: 60000,
      year: 120000,
    };
    const price = prices[sessionType] || 10000;

    let sessionDate = new Date();

    // Если single - проверяем и бронируем слот
    if (sessionType === 'single' && slotId) {
      const slot = await prisma.availableSlot.findUnique({
        where: { id: parseInt(slotId) },
      });

      if (!slot) {
        return NextResponse.json(
          { success: false, error: 'Слот не найден' },
          { status: 404 }
        );
      }

      if (slot.currentBookings >= slot.maxBookings) {
        return NextResponse.json(
          { success: false, error: 'Этот слот уже забронирован' },
          { status: 400 }
        );
      }

      // Создаём дату сессии из slot_date + slot_time
      const dateStr = slot.slotDate.toISOString().split('T')[0];
      const timeStr = slot.slotTime.toISOString().split('T')[1].substring(0, 8);
      sessionDate = new Date(`${dateStr}T${timeStr}`);

      // Обновляем слот (увеличиваем currentBookings)
      await prisma.availableSlot.update({
        where: { id: slot.id },
        data: {
          currentBookings: slot.currentBookings + 1,
          isAvailable: slot.currentBookings + 1 < slot.maxBookings,
        },
      });
    }

    // Создаём бронирование
    const booking = await prisma.booking.create({
      data: {
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientTelegram: clientTelegram?.trim() || null,
        clientPhone: clientPhone?.trim() || null,
        sessionType,
        sessionDate,
        sessionDuration: 90,
        price,
        status: 'pending',
        paymentStatus: 'unpaid',
        notes: notes?.trim() || null,
      },
    });

    // TODO: Отправить email клиенту с деталями
    // TODO: Отправить уведомление в Telegram

    return NextResponse.json({
      success: true,
      data: {
        id: booking.id,
        clientName: booking.clientName,
        sessionDate: booking.sessionDate,
        sessionType: booking.sessionType,
        price: booking.price,
        status: booking.status,
      },
      message: 'Бронирование успешно создано!',
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Произошла ошибка при создании бронирования' },
      { status: 500 }
    );
  }
}
