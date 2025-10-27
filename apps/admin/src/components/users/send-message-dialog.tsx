'use client'

import { useState } from 'react'
import { Send, MessageSquare, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

interface SendMessageDialogProps {
  telegramId: string
  userName?: string
}

export function SendMessageDialog({ telegramId, userName }: SendMessageDialogProps) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Быстрые шаблоны сообщений
  const templates = [
    {
      label: '👋 Приветствие',
      text: 'Привет! 👋\n\nКак твои успехи с эмоциональным дневником? Если есть вопросы, всегда рад помочь! 😊'
    },
    {
      label: '🎉 Поздравление',
      text: '🎉 *Поздравляю!*\n\nТы молодец! Продолжай в том же духе! 💪\n\nТвой прогресс вдохновляет! ✨'
    },
    {
      label: '💪 Мотивация',
      text: '💪 *Не сдавайся!*\n\nВерю в тебя! Каждый день — это новая возможность стать лучше.\n\nПродолжай работать над собой! 🚀'
    },
    {
      label: '❤️ Поддержка',
      text: '❤️ *Мы с тобой!*\n\nПомни: ты не один на этом пути. Если нужна помощь или просто хочешь поделиться — пиши!\n\nМы всегда рядом! 🤗'
    }
  ]

  const handleSend = async () => {
    if (!message.trim()) {
      alert('⚠️ Сообщение не может быть пустым')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId,
          message: message.trim(),
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert(`✅ Сообщение успешно отправлено пользователю ${userName || telegramId}`)
        setMessage('')
        setOpen(false)
      } else {
        throw new Error(data.error || 'Не удалось отправить сообщение')
      }
    } catch (error: any) {
      console.error('Error sending message:', error)
      alert(`❌ Ошибка: ${error.message || 'Не удалось отправить сообщение'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const useTemplate = (templateText: string) => {
    setMessage(templateText)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Send className="h-4 w-4 mr-2" />
          Отправить сообщение
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Отправить персональное сообщение
          </DialogTitle>
          <DialogDescription>
            Пользователь: <span className="font-semibold">{userName || telegramId}</span>
            <br />
            Сообщение будет отправлено через Telegram бота.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Быстрые шаблоны */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              📝 Быстрые шаблоны:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => useTemplate(template.text)}
                  className="justify-start text-xs"
                >
                  {template.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Текст сообщения */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              ✉️ Текст сообщения:
            </label>
            <Textarea
              placeholder="Введите сообщение для пользователя...&#10;&#10;Поддерживается Markdown:&#10;*жирный* _курсив_ `код` [ссылка](url)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <p className="text-xs text-slate-500 mt-2">
              💡 Поддерживается Markdown форматирование
            </p>
            <p className="text-xs text-slate-500">
              Символов: {message.length} / 4096
            </p>
          </div>

          {/* Предпросмотр (если есть текст) */}
          {message.trim() && (
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
              <p className="text-xs font-medium text-slate-600 mb-2">
                👁️ Предпросмотр:
              </p>
              <div className="text-sm text-slate-900 whitespace-pre-wrap">
                {message}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            Отмена
          </Button>
          <Button
            onClick={handleSend}
            disabled={isLoading || !message.trim()}
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? 'Отправка...' : 'Отправить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
