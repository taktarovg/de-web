import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CookieConsent from '@/components/cookie-consent'
import { YandexMetrika, GoogleAnalytics } from '@/components/analytics'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Дизайн Эмоций | Персональное сопровождение для лидеров',
  description: 'Превратите эмоции из врагов в стратегический актив. Персональная программа для лидеров, принимающих решения с высокой ценой ошибки.',
  keywords: 'эмоциональный интеллект, коучинг для руководителей, управление эмоциями, стратегические решения, эмоциональное выгорание, личная эффективность, бизнес-коучинг',
  authors: [{ name: 'Георгий Тактаров' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '500x500' },
    ],
  },
  openGraph: {
    title: 'Дизайн Эмоций | Георгий Тактаров',
    description: 'Персональное сопровождение для лидеров, принимающих решения с высокой ценой ошибки',
    url: 'https://designemotion.ru',
    siteName: 'Design Emotion',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <CookieConsent />
        
        {/* Аналитика - динамическая загрузка */}
        <YandexMetrika />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
