'use client'

import { useEffect, useState } from 'react'
import { MessageSquare, Clock, CheckCircle, XCircle, User, RefreshCw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface AdminMessage {
  id: string
  message: string
  status: 'pending' | 'sent' | 'failed'
  sentAt: string
  readAt?: string | null
  adminId?: string
  errorMessage?: string | null
  metadata?: any
}

interface MessageHistoryProps {
  telegramId: string
}

export function MessageHistory({ telegramId }: MessageHistoryProps) {
  const [messages, setMessages] = useState<AdminMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchMessages()
  }, [telegramId])

  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/send-message?telegramId=${telegramId}&limit=20`)
      const data = await response.json()

      if (data.success) {
        setMessages(data.data.messages)
        setTotal(data.data.pagination.total)
      }
    } catch (error) {
      console.error('Error fetching message history:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return (
          <Badge variant="default" className="flex items-center gap-1 bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3" />
            Отправлено
          </Badge>
        )
      case 'failed':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Ошибка
          </Badge>
        )
      case 'pending':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            В очереди
          </Badge>
        )
      default:
        return null
    }
  }

  const truncateMessage = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-slate-500">Загрузка истории сообщений...</div>
        </div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
          История сообщений
        </h3>
        <div className="text-center py-8 text-slate-500">
          <MessageSquare className="h-12 w-12 mx-auto mb-3 text-slate-300" />
          <p>Сообщений пока нет</p>
          <p className="text-sm mt-1">Отправьте первое сообщение пользователю</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
          История сообщений
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Всего: {total}</Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchMessages}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Дата и время</TableHead>
              <TableHead className="w-[120px]">Статус</TableHead>
              <TableHead>Сообщение</TableHead>
              <TableHead className="w-[120px]">Отправитель</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg) => (
              <TableRow key={msg.id}>
                <TableCell className="text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(msg.sentAt)}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(msg.status)}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-900 whitespace-pre-wrap">
                      {truncateMessage(msg.message, 150)}
                    </p>
                    {msg.errorMessage && (
                      <p className="text-xs text-red-600">
                        ⚠️ {msg.errorMessage}
                      </p>
                    )}
                    {msg.metadata?.template && (
                      <Badge variant="outline" className="text-xs">
                        📝 {msg.metadata.template}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {msg.adminId || 'admin'}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {total > 20 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-500">
            Показаны последние 20 из {total} сообщений
          </p>
        </div>
      )}
    </div>
  )
}
