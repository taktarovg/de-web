import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CookieConsent from '@/components/cookie-consent'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Дизайн Эмоций | Эмоциональный интеллект через метод Седона',
  description: 'Развивайте эмоциональный интеллект через 108 эмоций, шкалу Хокинса и 8-шаговый метод Седона',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
