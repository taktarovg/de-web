import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@ecosystem/database';

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.emotionCategory.findMany({
      orderBy: {
        sortOrder: 'asc'
      }
    });

    const formatted = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      emoji: cat.emoji,
      level: cat.levelMin,
      description: cat.description || ''
    }));

    return NextResponse.json({
      success: true,
      data: formatted
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
