'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Eye, Mail, Phone, MessageCircle, Calendar, Clock } from 'lucide-react'

interface Booking {
  id: number
  clientName: string
  clientEmail: string
  clientTelegram: string | null
  clientPhone: string | null
  sessionType: string
  sessionDate: Date
  sessionDuration: number
  price: number
  status: string
  notes: string | null
  paymentStatus: string
  paymentMethod: string | null
  createdAt: Date
  updatedAt: Date
}

interface BookingsTableProps {
  bookings: Booking[]
}

const statusConfig = {
  pending: { label: 'Ожидает', color: 'bg-orange-100 text-orange-700' },
  confirmed: { label: 'Подтверждено', color: 'bg-green-100 text-green-700' },
  completed: { label: 'Завершено', color: 'bg-blue-100 text-blue-700' },
  cancelled: { label: 'Отменено', color: 'bg-red-100 text-red-700' },
}

const paymentStatusConfig = {
  unpaid: { label: 'Не оплачено', color: 'bg-gray-100 text-gray-700' },
  paid: { label: 'Оплачено', color: 'bg-green-100 text-green-700' },
  refunded: { label: 'Возврат', color: 'bg-red-100 text-red-700' },
}

const sessionTypeConfig = {
  single: { label: 'Разовая сессия', price: 10000 },
  quarter: { label: 'Квартал', price: 60000 },
  year: { label: 'Год', price: 120000 },
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' ? true : booking.status === filter
  )

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        window.location.reload()
      } else {
        alert('Ошибка при обновлении статуса')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Ошибка при обновлении статуса')
    }
  }

  const handlePaymentStatusChange = async (id: number, newPaymentStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: newPaymentStatus }),
      })

      if (response.ok) {
        window.location.reload()
      } else {
        alert('Ошибка при обновлении статуса оплаты')
      }
    } catch (error) {
      console.error('Error updating payment status:', error)
      alert('Ошибка при обновлении статуса оплаты')
    }
  }

  return (
    <>
      {/* Filters */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">Фильтр:</span>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Все ({bookings.length})
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('pending')}
            >
              Ожидают ({bookings.filter(b => b.status === 'pending').length})
            </Button>
            <Button
              variant={filter === 'confirmed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('confirmed')}
            >
              Подтверждено ({bookings.filter(b => b.status === 'confirmed').length})
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Завершено ({bookings.filter(b => b.status === 'completed').length})
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Дата/Время сессии
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Клиент
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Тип сессии
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Цена
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Оплата
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  Нет бронирований
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => {
                const statusInfo = statusConfig[booking.status as keyof typeof statusConfig] || statusConfig.pending
                const paymentInfo = paymentStatusConfig[booking.paymentStatus as keyof typeof paymentStatusConfig] || paymentStatusConfig.unpaid
                const sessionInfo = sessionTypeConfig[booking.sessionType as keyof typeof sessionTypeConfig] || { label: booking.sessionType, price: booking.price }

                return (
                  <tr key={booking.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-slate-900">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        {format(new Date(booking.sessionDate), 'dd MMM yyyy', { locale: ru })}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(booking.sessionDate), 'HH:mm', { locale: ru })} • {booking.sessionDuration} мин
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">{booking.clientName}</div>
                      <div className="text-xs text-slate-500 space-y-1 mt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {booking.clientEmail}
                        </div>
                        {booking.clientTelegram && (
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {booking.clientTelegram}
                          </div>
                        )}
                        {booking.clientPhone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {booking.clientPhone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {sessionInfo.label}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {(booking.price / 1000).toFixed(0)}k ₽
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusInfo.color}>
                        {statusInfo.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={paymentInfo.color}>
                        {paymentInfo.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали бронирования</DialogTitle>
            <DialogDescription>
              ID: #{selectedBooking?.id} • Создано: {selectedBooking && format(new Date(selectedBooking.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              {/* Информация о клиенте */}
              <div className="border-b pb-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Клиент</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700">Имя:</label>
                    <p className="mt-1 text-sm text-slate-900">{selectedBooking.clientName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700">Email:</label>
                    <p className="mt-1 text-sm text-slate-900">{selectedBooking.clientEmail}</p>
                  </div>
                  {selectedBooking.clientTelegram && (
                    <div>
                      <label className="text-xs font-medium text-slate-700">Telegram:</label>
                      <p className="mt-1 text-sm text-slate-900">{selectedBooking.clientTelegram}</p>
                    </div>
                  )}
                  {selectedBooking.clientPhone && (
                    <div>
                      <label className="text-xs font-medium text-slate-700">Телефон:</label>
                      <p className="mt-1 text-sm text-slate-900">{selectedBooking.clientPhone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Информация о сессии */}
              <div className="border-b pb-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Сессия</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700">Тип:</label>
                    <p className="mt-1 text-sm text-slate-900">
                      {sessionTypeConfig[selectedBooking.sessionType as keyof typeof sessionTypeConfig]?.label || selectedBooking.sessionType}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700">Дата и время:</label>
                    <p className="mt-1 text-sm text-slate-900">
                      {format(new Date(selectedBooking.sessionDate), 'dd MMMM yyyy, HH:mm', { locale: ru })}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700">Длительность:</label>
                    <p className="mt-1 text-sm text-slate-900">{selectedBooking.sessionDuration} минут</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700">Цена:</label>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{(selectedBooking.price / 1000).toFixed(0)}k ₽</p>
                  </div>
                </div>
              </div>

              {/* Заметки */}
              {selectedBooking.notes && (
                <div className="border-b pb-4">
                  <label className="text-xs font-medium text-slate-700">Заметки:</label>
                  <div className="mt-2 p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-900 whitespace-pre-wrap">{selectedBooking.notes}</p>
                  </div>
                </div>
              )}

              {/* Управление статусами */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-2 block">Статус бронирования:</label>
                  <Select
                    value={selectedBooking.status}
                    onValueChange={(value) => {
                      handleStatusChange(selectedBooking.id, value)
                      setSelectedBooking(null)
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Ожидает</SelectItem>
                      <SelectItem value="confirmed">Подтверждено</SelectItem>
                      <SelectItem value="completed">Завершено</SelectItem>
                      <SelectItem value="cancelled">Отменено</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 mb-2 block">Статус оплаты:</label>
                  <Select
                    value={selectedBooking.paymentStatus}
                    onValueChange={(value) => {
                      handlePaymentStatusChange(selectedBooking.id, value)
                      setSelectedBooking(null)
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unpaid">Не оплачено</SelectItem>
                      <SelectItem value="paid">Оплачено</SelectItem>
                      <SelectItem value="refunded">Возврат</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
