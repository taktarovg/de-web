'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
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
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 z-50 transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-md mx-auto md:mx-0">
        <div className="relative bg-graphite-light border border-bronze/30 rounded-lg p-4 shadow-xl">
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-ivory/60 hover:text-ivory transition-colors"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="pr-6">
            <h3 className="text-sm font-semibold text-ivory mb-2">
              🍪 Мы используем cookies
            </h3>
            <p className="text-xs text-ivory/80 leading-relaxed mb-3">
              Для улучшения работы сайта. Никакой аналитики и слежки.{' '}
              <Link href="/legal/privacy" className="text-bronze hover:text-bronze-light underline">
                Подробнее
              </Link>
            </p>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleAccept}
                size="sm"
                className="bg-bronze hover:bg-bronze-dark text-graphite text-xs px-4 py-1 h-auto font-medium"
              >
                Принять
              </Button>
              <Button
                onClick={handleDecline}
                size="sm"
                className="bg-graphite border border-ivory/30 text-ivory hover:bg-graphite-dark text-xs px-4 py-1 h-auto font-medium"
              >
                Отклонить
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
