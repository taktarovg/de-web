import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@designemotion/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const emotions = await prisma.emotion.findMany({
      where: {
        category: {
          equals: params.category,
          mode: 'insensitive'
        },
        isActive: true
      },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }]
    });

    return NextResponse.json({
      success: true,
      data: emotions
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch emotions' },
      { status: 500 }
    );
  }
}
