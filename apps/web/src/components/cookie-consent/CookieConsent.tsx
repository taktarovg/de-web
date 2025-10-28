'use client'

import { useState, useEffect } from 'react'
import { Cookie, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Проверяем, дал ли пользователь согласие ранее
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Показываем баннер через 1 секунду после загрузки страницы
      setTimeout(() => {
        setIsVisible(true)
        setIsAnimating(true)
      }, 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    handleClose()
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    handleClose()
  }

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-calm-200 p-6 md:p-8">
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-ocean-400 hover:text-ocean-600 transition-colors"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="h-16 w-16 bg-gradient-to-br from-calm-100 to-sage-100 rounded-2xl flex items-center justify-center">
                <Cookie className="h-8 w-8 text-calm-600" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow">
              <h3 className="text-xl md:text-2xl font-bold text-ocean-500 mb-2">
                🍪 Печеньки для эмоций?
              </h3>
              <p className="text-ocean-400 leading-relaxed mb-1">
                <strong className="text-ocean-500">Не волнуйтесь, они не калорийные!</strong> 
                {' '}Мы используем cookies, чтобы запомнить ваши настройки и сделать работу с ботом удобнее. 
                Обещаем не анализировать ваши эмоции без вашего ведома 😊
              </p>
              <p className="text-sm text-ocean-400">
                Подробнее в нашей{' '}
                <Link href="/legal/privacy" className="text-calm-500 hover:text-calm-600 underline">
                  Политике конфиденциальности
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <Button
                onClick={handleAccept}
                className="bg-calm-500 hover:bg-calm-600 text-white px-6"
              >
                Принять все 🎉
              </Button>
              <Button
                onClick={handleDecline}
                variant="outline"
                className="border-ocean-300 text-ocean-600 hover:bg-ocean-50 px-6"
              >
                Только необходимые
              </Button>
            </div>

          </div>

          {/* Fun fact */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-ocean-400 italic">
              💡 <strong className="text-ocean-500">Факт:</strong> Мы не используем Google Analytics, 
              Яндекс.Метрику или другие инструменты слежки. Ваши эмоции — только ваши.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
