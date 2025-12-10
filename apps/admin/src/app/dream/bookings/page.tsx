import { prisma } from '@ecosystem/database'
import { BookingsTable } from '@/components/bookings/bookings-table'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, DollarSign, CheckCircle2 } from 'lucide-react'

export const revalidate = 0

async function getBookingsStats() {
  try {
    const [total, pendingCount, confirmedCount, totalRevenue] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'pending' } }),
      prisma.booking.count({ where: { status: 'confirmed' } }),
      prisma.booking.aggregate({
        where: { paymentStatus: 'paid' },
        _sum: { price: true },
      }),
    ])

    return {
      total,
      pendingCount,
      confirmedCount,
      totalRevenue: totalRevenue._sum.price || 0,
      error: null,
    }
  } catch (error) {
    console.error('Error fetching bookings stats:', error)
    return {
      total: 0,
      pendingCount: 0,
      confirmedCount: 0,
      totalRevenue: 0,
      error: 'Ошибка подключения к БД',
    }
  }
}

async function getBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { sessionDate: 'asc' },
      take: 100,
    })
    return { bookings, error: null }
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return { bookings: [], error: 'Ошибка загрузки бронирований' }
  }
}

export default async function BookingsPage() {
  const stats = await getBookingsStats()
  const { bookings, error } = await getBookings()

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Бронирования</h1>
        <p className="text-slate-600 mt-1">Управление сессиями и консультациями</p>
      </div>

      {/* Error Alert */}
      {(stats.error || error) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            ⚠️ {stats.error || error}
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Всего бронирований</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Ожидают</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{stats.pendingCount}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Подтверждено</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{stats.confirmedCount}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Выручка</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {(stats.totalRevenue / 1000).toFixed(0)}k ₽
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Список бронирований</h2>
        </div>
        
        <BookingsTable bookings={bookings} />
      </div>
    </div>
  )
}
