'use client'

import { useState } from 'react'
import { StatsCard } from '@/components/stats-card'
import { CreateBroadcastModal } from './create-broadcast-modal'
import {
  Send,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Eye,
  Play,
  Trash2
} from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface Broadcast {
  id: string
  title: string
  message: string
  imageUrl: string | null
  buttonText: string | null
  buttonUrl: string | null
  status: string
  scheduledAt: Date | null
  startedAt: Date | null
  completedAt: Date | null
  totalUsers: number
  sentCount: number
  failedCount: number
  successRate: number
  targetFilters: any
  createdBy: string | null
  createdAt: Date
  updatedAt: Date
}

interface BroadcastsPageClientProps {
  broadcasts: Broadcast[]
  stats: {
    total: number
    completed: number
    sending: number
    scheduled: number
    totalSent: number
    totalUsers: number
  }
}

export function BroadcastsPageClient({ broadcasts, stats }: BroadcastsPageClientProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedBroadcast, setSelectedBroadcast] = useState<Broadcast | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Черновик', color: 'bg-slate-100 text-slate-700', icon: AlertCircle },
      scheduled: { label: 'Запланирована', color: 'bg-blue-100 text-blue-700', icon: Clock },
      sending: { label: 'Отправляется', color: 'bg-yellow-100 text-yellow-700', icon: Send },
      completed: { label: 'Завершена', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      failed: { label: 'Ошибка', color: 'bg-red-100 text-red-700', icon: AlertCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    )
  }

  const handleSendBroadcast = async (id: string) => {
    if (!confirm('Вы уверены, что хотите начать рассылку? Это действие нельзя отменить.')) {
      return
    }

    try {
      const response = await fetch('/api/broadcasts/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ broadcastId: id }),
      })

      if (response.ok) {
        alert('Рассылка запущена!')
        window.location.reload()
      } else {
        alert('Ошибка при запуске рассылки')
      }
    } catch (error) {
      alert('Ошибка при запуске рассылки')
    }
  }

  const handleDeleteBroadcast = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту рассылку?')) {
      return
    }

    try {
      const response = await fetch(`/api/broadcasts/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Рассылка удалена!')
        window.location.reload()
      } else {
        alert('Ошибка при удалении')
      }
    } catch (error) {
      alert('Ошибка при удалении')
    }
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Рассылки</h1>
          <p className="text-slate-600 mt-1">Создавайте и отправляйте сообщения всем пользователям</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Send className="w-4 h-4" />
          Создать рассылку
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Всего рассылок"
          value={stats.total}
          icon={Send}
          description="За всё время"
        />
        <StatsCard
          title="Завершённых"
          value={stats.completed}
          icon={CheckCircle}
          description="Успешно доставлено"
        />
        <StatsCard
          title="В процессе"
          value={stats.sending + stats.scheduled}
          icon={Clock}
          description="Отправляется или запланировано"
        />
        <StatsCard
          title="Получателей"
          value={stats.totalUsers}
          icon={Users}
          description="Пользователей с уведомлениями"
        />
      </div>

      {/* Broadcasts List */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold">История рассылок</h2>
          <p className="text-sm text-slate-600 mt-1">
            {broadcasts.length} рассылок
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left bg-slate-50">
                <th className="p-4 text-sm font-medium text-slate-600">Заголовок</th>
                <th className="p-4 text-sm font-medium text-slate-600">Статус</th>
                <th className="p-4 text-sm font-medium text-slate-600">Отправлено</th>
                <th className="p-4 text-sm font-medium text-slate-600">Успешность</th>
                <th className="p-4 text-sm font-medium text-slate-600">Дата</th>
                <th className="p-4 text-sm font-medium text-slate-600">Действия</th>
              </tr>
            </thead>
            <tbody>
              {broadcasts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Send className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="text-lg font-medium">Рассылок пока нет</p>
                    <p className="text-sm mt-1">Создайте первую рассылку для пользователей</p>
                  </td>
                </tr>
              ) : (
                broadcasts.map((broadcast) => (
                  <tr key={broadcast.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-slate-900">{broadcast.title}</p>
                        <p className="text-sm text-slate-500 truncate max-w-xs">
                          {broadcast.message.substring(0, 60)}...
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(broadcast.status)}
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="font-medium text-slate-900">{broadcast.sentCount} / {broadcast.totalUsers}</p>
                        {broadcast.failedCount > 0 && (
                          <p className="text-red-600">Ошибок: {broadcast.failedCount}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden max-w-[100px]">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${broadcast.successRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {Math.round(broadcast.successRate)}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-600">
                        {broadcast.completedAt ? (
                          <div>
                            <p>Завершена:</p>
                            <p>{format(new Date(broadcast.completedAt), 'dd MMM yyyy HH:mm', { locale: ru })}</p>
                          </div>
                        ) : broadcast.scheduledAt ? (
                          <div>
                            <p>Запланирована:</p>
                            <p>{format(new Date(broadcast.scheduledAt), 'dd MMM yyyy HH:mm', { locale: ru })}</p>
                          </div>
                        ) : (
                          <div>
                            <p>Создана:</p>
                            <p>{format(new Date(broadcast.createdAt), 'dd MMM yyyy HH:mm', { locale: ru })}</p>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedBroadcast(broadcast)
                            setIsViewModalOpen(true)
                          }}
                          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Просмотр"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {broadcast.status === 'draft' && (
                          <button
                            onClick={() => handleSendBroadcast(broadcast.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Отправить"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        {(broadcast.status === 'draft' || broadcast.status === 'failed') && (
                          <button
                            onClick={() => handleDeleteBroadcast(broadcast.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Удалить"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <CreateBroadcastModal
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false)
            window.location.reload()
          }}
        />
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedBroadcast && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto m-4">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold">{selectedBroadcast.title}</h2>
              <p className="text-sm text-slate-600 mt-1">
                Создана {format(new Date(selectedBroadcast.createdAt), 'dd MMMM yyyy HH:mm', { locale: ru })}
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-600 mb-2">Сообщение:</h3>
                <p className="text-slate-900 whitespace-pre-wrap">{selectedBroadcast.message}</p>
              </div>
              {selectedBroadcast.imageUrl && (
                <div>
                  <h3 className="text-sm font-medium text-slate-600 mb-2">Изображение:</h3>
                  <img src={selectedBroadcast.imageUrl} alt="Broadcast" className="rounded-lg max-w-full" />
                </div>
              )}
              {selectedBroadcast.buttonText && (
                <div>
                  <h3 className="text-sm font-medium text-slate-600 mb-2">Кнопка:</h3>
                  <p className="text-slate-900">{selectedBroadcast.buttonText} → {selectedBroadcast.buttonUrl}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-600">Статус:</h3>
                  <p className="mt-1">{getStatusBadge(selectedBroadcast.status)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-600">Отправлено:</h3>
                  <p className="text-lg font-bold text-slate-900 mt-1">
                    {selectedBroadcast.sentCount} / {selectedBroadcast.totalUsers}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
