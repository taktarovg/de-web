'use client'

import { useState } from 'react'
import { X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react'

interface CreateBroadcastModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function CreateBroadcastModal({ onClose, onSuccess }: CreateBroadcastModalProps) {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [buttonText, setButtonText] = useState('')
  const [buttonUrl, setButtonUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !message) {
      alert('Заполните обязательные поля')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/broadcasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          message,
          imageUrl: imageUrl || null,
          buttonText: buttonText || null,
          buttonUrl: buttonUrl || null,
        }),
      })

      if (response.ok) {
        onSuccess()
      } else {
        const error = await response.json()
        alert(`Ошибка: ${error.message || 'Не удалось создать рассылку'}`)
      }
    } catch (error) {
      alert('Ошибка при создании рассылки')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-bold">Создать рассылку</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Заголовок рассылки *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Например: Новая функция в боте"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Только для внутреннего использования, пользователи не увидят
            </p>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Текст сообщения *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Привет! 👋 У нас для вас отличная новость..."
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Используйте эмодзи и форматирование для лучшего восприятия
            </p>
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <ImageIcon className="w-4 h-4" />
              URL изображения (опционально)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-slate-500 mt-1">
              Добавьте изображение для привлечения внимания
            </p>
          </div>

          {/* Button */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <LinkIcon className="w-4 h-4" />
              Кнопка (опционально)
            </label>
            
            <div>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Текст кнопки, например: Открыть бота"
              />
            </div>

            <div>
              <input
                type="url"
                value={buttonUrl}
                onChange={(e) => setButtonUrl(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://t.me/your_bot"
              />
            </div>

            <p className="text-xs text-slate-500">
              Добавьте кнопку для перехода к боту или внешнему ресурсу
            </p>
          </div>

          {/* Preview */}
          {message && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="text-xs font-medium text-slate-600 mb-3">Предпросмотр:</p>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="w-full rounded-lg mb-3"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}
                <p className="text-slate-900 whitespace-pre-wrap">{message}</p>
                {buttonText && buttonUrl && (
                  <button className="mt-3 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium">
                    {buttonText}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Создание...' : 'Создать черновик'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
