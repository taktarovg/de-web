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
import { Eye, CheckCircle2, XCircle, Clock } from 'lucide-react'

interface Application {
  id: number
  name: string
  company: string | null
  contact: string
  request: string
  status: string
  createdAt: Date
  updatedAt: Date
}

interface ApplicationsTableProps {
  applications: Application[]
}

const statusConfig = {
  new: { label: 'Новая', color: 'bg-orange-100 text-orange-700', icon: Clock },
  contacted: { label: 'Связались', color: 'bg-blue-100 text-blue-700', icon: CheckCircle2 },
  completed: { label: 'Завершено', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  rejected: { label: 'Отклонено', color: 'bg-red-100 text-red-700', icon: XCircle },
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredApplications = applications.filter(app => 
    filter === 'all' ? true : app.status === filter
  )

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
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
              Все ({applications.length})
            </Button>
            <Button
              variant={filter === 'new' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('new')}
            >
              Новые ({applications.filter(a => a.status === 'new').length})
            </Button>
            <Button
              variant={filter === 'contacted' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('contacted')}
            >
              Связались ({applications.filter(a => a.status === 'contacted').length})
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Завершено ({applications.filter(a => a.status === 'completed').length})
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
                Дата
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Имя
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Компания
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Контакт
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredApplications.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  Нет заявок
                </td>
              </tr>
            ) : (
              filteredApplications.map((application) => {
                const statusInfo = statusConfig[application.status as keyof typeof statusConfig] || statusConfig.new
                const StatusIcon = statusInfo.icon

                return (
                  <tr key={application.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {format(new Date(application.createdAt), 'dd MMM yyyy, HH:mm', { locale: ru })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{application.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {application.company || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {application.contact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        <Select
                          value={application.status}
                          onValueChange={(value) => handleStatusChange(application.id, value)}
                        >
                          <SelectTrigger className="w-[140px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">Новая</SelectItem>
                            <SelectItem value="contacted">Связались</SelectItem>
                            <SelectItem value="completed">Завершено</SelectItem>
                            <SelectItem value="rejected">Отклонено</SelectItem>
                          </SelectContent>
                        </Select>
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
      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали заявки</DialogTitle>
            <DialogDescription>
              Создана: {selectedApplication && format(new Date(selectedApplication.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Имя:</label>
                <p className="mt-1 text-sm text-slate-900">{selectedApplication.name}</p>
              </div>

              {selectedApplication.company && (
                <div>
                  <label className="text-sm font-medium text-slate-700">Компания:</label>
                  <p className="mt-1 text-sm text-slate-900">{selectedApplication.company}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-slate-700">Контакт:</label>
                <p className="mt-1 text-sm text-slate-900">{selectedApplication.contact}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Запрос:</label>
                <div className="mt-1 p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-900 whitespace-pre-wrap">{selectedApplication.request}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Статус:</label>
                <div className="mt-2">
                  <Select
                    value={selectedApplication.status}
                    onValueChange={(value) => {
                      handleStatusChange(selectedApplication.id, value)
                      setSelectedApplication(null)
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Новая</SelectItem>
                      <SelectItem value="contacted">Связались</SelectItem>
                      <SelectItem value="completed">Завершено</SelectItem>
                      <SelectItem value="rejected">Отклонено</SelectItem>
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
