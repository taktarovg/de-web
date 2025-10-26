'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Users, Heart, BookOpen, BarChart3, Settings, Send, LogOut } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dream', icon: LayoutDashboard },
  { name: 'Пользователи', href: '/dream/users', icon: Users },
  { name: 'Эмоции', href: '/dream/emotions', icon: Heart },
  { name: 'Курс', href: '/dream/course', icon: BookOpen },
  { name: 'Рассылки', href: '/dream/broadcasts', icon: Send },
  { name: 'Аналитика', href: '/dream/analytics', icon: BarChart3 },
  { name: 'Настройки', href: '/dream/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="flex flex-col w-64 bg-slate-900 text-white">
      <div className="flex items-center gap-3 p-6 border-b border-slate-800">
        <Heart className="h-8 w-8 text-rose-500" />
        <div>
          <div className="font-bold text-lg">Dream Admin</div>
          <div className="text-xs text-slate-400">Дизайн Эмоций</div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <div className="flex items-center gap-3 px-4 py-3 text-sm">
          <div className="h-8 w-8 rounded-full bg-rose-500 flex items-center justify-center font-semibold">
            A
          </div>
          <div className="flex-1">
            <div className="font-medium">Admin</div>
            <div className="text-xs text-slate-400">admin@designemotion.ru</div>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Выход
        </button>
      </div>
    </div>
  )
}
