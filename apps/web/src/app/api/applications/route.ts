import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@ecosystem/database';

// POST /api/applications - создать заявку
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация
    const { name, company, contact, request: userRequest } = body;

    if (!name || !contact || !userRequest) {
      return NextResponse.json(
        { success: false, error: 'Заполните все обязательные поля' },
        { status: 400 }
      );
    }

    // Простая валидация email или telegram
    if (!contact.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Укажите корректный email или Telegram (@username)' },
        { status: 400 }
      );
    }

    // Создание заявки
    const application = await prisma.application.create({
      data: {
        name: name.trim(),
        company: company?.trim() || null,
        contact: contact.trim(),
        request: userRequest.trim(),
        status: 'new',
      },
    });

    // TODO: Отправить уведомление в Telegram (опционально)
    // TODO: Отправить email клиенту (опционально)

    return NextResponse.json({
      success: true,
      data: {
        id: application.id,
        name: application.name,
        contact: application.contact,
        createdAt: application.createdAt,
      },
      message: 'Заявка успешно отправлена! Я свяжусь с вами в течение 24 часов.',
    });

  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { success: false, error: 'Произошла ошибка при отправке заявки' },
      { status: 500 }
    );
  }
}

// GET /api/applications - получить все заявки (для админки, позже)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    const applications = await prisma.application.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: applications,
      count: applications.length,
    });

  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка при получении заявок' },
      { status: 500 }
    );
  }
}
