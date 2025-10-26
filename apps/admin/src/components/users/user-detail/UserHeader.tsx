'use client'

import { User, Calendar, Globe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface UserHeaderProps {
  user: {
    telegram_id: string
    first_name: string | null
    last_name: string | null
    username: string | null
    full_name: string
    is_program_active: boolean
    language_code: string | null
    created_at: string
    updated_at: string
  }
}

export function UserHeader({ user }: UserHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="h-20 w-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          
          {/* User Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">
                {user.full_name || 'Без имени'}
              </h1>
              <Badge 
                variant={user.is_program_active ? 'success' : 'secondary'}
                className="text-sm"
              >
                {user.is_program_active ? '✅ Активен' : '⏸️ Неактивен'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-white/90">
              {user.username && (
                <span className="flex items-center gap-1">
                  <span className="text-white/70">@</span>
                  {user.username}
                </span>
              )}
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                ID: {user.telegram_id}
              </span>
              {user.language_code && (
                <span className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {user.language_code.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Registration Date */}
        <div className="text-right">
          <div className="flex items-center gap-2 text-white/90 mb-1">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Зарегистрирован</span>
          </div>
          <p className="text-lg font-semibold">
            {format(new Date(user.created_at), 'd MMMM yyyy', { locale: ru })}
          </p>
          <p className="text-sm text-white/70">
            {format(new Date(user.created_at), 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  )
}
