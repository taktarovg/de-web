import { NextResponse } from 'next/server'
import { prisma } from '@designemotion/database'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Проверяем, что рассылка существует и можно удалить
    const broadcast = await prisma.broadcast.findUnique({
      where: { id },
    })

    if (!broadcast) {
      return NextResponse.json(
        { error: 'Broadcast not found' },
        { status: 404 }
      )
    }

    if (broadcast.status === 'sending') {
      return NextResponse.json(
        { error: 'Cannot delete broadcast that is currently sending' },
        { status: 400 }
      )
    }

    // Удаляем рассылку (каскадно удалятся и deliveries)
    await prisma.broadcast.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting broadcast:', error)
    return NextResponse.json(
      { error: 'Failed to delete broadcast' },
      { status: 500 }
    )
  }
}
