'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, CheckCircle, Clock, XCircle, ChevronDown, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface Message {
  id: string
  message: string
  status: 'pending' | 'sent' | 'failed'
  sentAt: string
  readAt: string | null
  errorMessage: string | null
  adminId: string | null
}

interface MessageStats {
  total: number
  sent: number
  pending: number
  failed: number
}

interface MessageHistoryProps {
  telegramId: string
}

export function MessageHistory({ telegramId }: MessageHistoryProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [stats, setStats] = useState<MessageStats>({ total: 0, sent: 0, pending: 0, failed: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set())
  const [hasMore, setHasMore] = useState(false)
  const [offset, setOffset] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [telegramId])

  const fetchMessages = async (offsetValue = 0) => {
    const loadingState = offsetValue === 0 ? setIsLoading : setIsLoadingMore
    loadingState(true)

    try {
      const response = await fetch(
        `/api/users/${telegramId}/messages?limit=10&offset=${offsetValue}`
      )
      const data = await response.json()

      if (data.success) {
        if (offsetValue === 0) {
          setMessages(data.data.messages)
          setStats(data.data.stats)
        } else {
          setMessages(prev => [...prev, ...data.data.messages])
        }
        setHasMore(data.data.pagination.hasMore)
        setOffset(offsetValue + 10)
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      loadingState(false)
    }
  }

  const toggleExpand = (messageId: string) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
      }
      return newSet
    })
  }

  const getStatusBadge = (status: string, errorMessage: string | null) => {
    const config = {
      pending: { 
        label: 'Ожидает', 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200', 
        icon: AlertCircle 
      },
      sent: { 
        label: 'Отправлено', 
        color: 'bg-blue-100 text-blue-700 border-blue-200', 
        icon: Clock 
      },
      failed: { 
        label: 'Ошибка', 
        color: 'bg-red-100 text-red-700 border-red-200', 
        icon: XCircle 
      },
    }

    const statusConfig = config[status as keyof typeof config] || config.sent
    const Icon = statusConfig.icon

    return (
      <Badge 
        variant="outline" 
        className={`${statusConfig.color} border`}
        title={errorMessage || ''}
      >
        <Icon className="w-3 h-3 mr-1" />
        {statusConfig.label}
      </Badge>
    )
  }

  const truncateMessage = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-slate-200 rounded w-64"></div>
            <div className="h-6 bg-slate-200 rounded w-20"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-slate-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-indigo-500" />
          История персональных сообщений
        </h3>
        <div className="text-center py-12 text-slate-400">
          <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Персональных сообщений пока нет</p>
          <p className="text-sm mt-2">
            Отправьте первое сообщение пользователю через кнопку "Отправить сообщение" выше
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-indigo-500" />
          История персональных сообщений
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            Всего: {stats.total}
          </Badge>
          {stats.sent > 0 && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              Отправлено: {stats.sent}
            </Badge>
          )}
          {stats.failed > 0 && (
            <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
              Ошибок: {stats.failed}
            </Badge>
          )}
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {messages.map((msg) => {
          const isExpanded = expandedMessages.has(msg.id)
          const needsTruncation = msg.message.length > 150

          return (
            <div
              key={msg.id}
              className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors hover:shadow-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {getStatusBadge(msg.status, msg.errorMessage)}
                  {msg.readAt && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Прочитано {format(new Date(msg.readAt), 'dd MMM HH:mm', { locale: ru })}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                  {format(new Date(msg.sentAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}
                </span>
              </div>

              {/* Message Text */}
              <div className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 rounded p-3 mb-2">
                {isExpanded || !needsTruncation
                  ? msg.message
                  : truncateMessage(msg.message)}
              </div>

              {/* Expand Button */}
              {needsTruncation && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(msg.id)}
                  className="h-auto py-1 px-2 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                >
                  {isExpanded ? 'Свернуть' : 'Показать полностью'}
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </Button>
              )}

              {/* Error Message */}
              {msg.errorMessage && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  <strong className="flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    Ошибка доставки:
                  </strong>
                  <p className="mt-1">{msg.errorMessage}</p>
                </div>
              )}

              {/* Admin ID */}
              {msg.adminId && (
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                  <span className="font-medium">Отправил:</span>
                  <span>{msg.adminId}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchMessages(offset)}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Загрузка...
              </>
            ) : (
              'Показать ещё'
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
