import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  description?: string
  className?: string
}

export function StatsCard({ title, value, icon: Icon, description, className }: StatsCardProps) {
  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-slate-200 p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="h-12 w-12 bg-rose-50 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-rose-600" />
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
    </div>
  )
}
