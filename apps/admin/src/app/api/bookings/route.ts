import { NextResponse } from 'next/server'
import { prisma } from '@ecosystem/database'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const paymentStatus = searchParams.get('paymentStatus')

    const where: any = {}
    if (status && status !== 'all') where.status = status
    if (paymentStatus && paymentStatus !== 'all') where.paymentStatus = paymentStatus

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { sessionDate: 'desc' },
    })

    return NextResponse.json({ success: true, data: bookings })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
