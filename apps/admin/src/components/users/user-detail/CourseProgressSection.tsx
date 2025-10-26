'use client'

import { BookOpen, CheckCircle2, Circle, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface CourseProgress {
  total_days: number
  current_day: number
  completed_days_count: number
  completed_days: number[]
  is_active: boolean
  started_at: string | null
  completed_at: string | null
  total_lessons_completed: number
  completion_percentage: number
}

interface CourseProgressSectionProps {
  courseProgress: CourseProgress
}

export function CourseProgressSection({ courseProgress }: CourseProgressSectionProps) {
  const progressPercentage = courseProgress.completion_percentage || 0
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
          Курс "Дневник эмоций"
        </h3>
        <div className="flex items-center gap-3">
          {courseProgress.is_active ? (
            <Badge variant="default">Активен</Badge>
          ) : (
            <Badge variant="secondary">Неактивен</Badge>
          )}
          <Badge variant={progressPercentage === 100 ? 'success' : 'secondary'}>
            {progressPercentage}%
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <p className="text-2xl font-bold text-indigo-600">{courseProgress.current_day}</p>
          <p className="text-xs text-slate-600 mt-1">Текущий день</p>
        </div>
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{courseProgress.completed_days_count}</p>
          <p className="text-xs text-slate-600 mt-1">Завершено дней</p>
        </div>
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">{courseProgress.total_lessons_completed}</p>
          <p className="text-xs text-slate-600 mt-1">Уроков пройдено</p>
        </div>
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <p className="text-2xl font-bold text-slate-600">
            {courseProgress.total_days - courseProgress.completed_days_count}
          </p>
          <p className="text-xs text-slate-600 mt-1">Осталось</p>
        </div>
      </div>

      {/* Timeline Info */}
      {courseProgress.started_at && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Начало:</span>
            <span>{new Date(courseProgress.started_at).toLocaleDateString('ru-RU')}</span>
            
            {courseProgress.completed_at && (
              <>
                <span className="mx-2">•</span>
                <span className="font-medium">Завершение:</span>
                <span>{new Date(courseProgress.completed_at).toLocaleDateString('ru-RU')}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Days Grid */}
      {courseProgress.is_active && (
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3">
            Прогресс по дням ({courseProgress.completed_days_count} из {courseProgress.total_days}):
          </h4>
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: courseProgress.total_days }, (_, i) => {
              const dayNumber = i + 1
              const isCompleted = courseProgress.completed_days.includes(dayNumber)
              const isCurrent = dayNumber === courseProgress.current_day
              
              return (
                <div
                  key={dayNumber}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                    transition-all duration-200 relative
                    ${isCompleted 
                      ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                      : isCurrent
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300 ring-2 ring-indigo-200'
                      : 'bg-slate-100 text-slate-400'
                    }
                  `}
                  title={
                    isCompleted 
                      ? `День ${dayNumber} - Завершён ✓` 
                      : isCurrent 
                      ? `День ${dayNumber} - Текущий`
                      : `День ${dayNumber}`
                  }
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : isCurrent ? (
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-xs">{dayNumber}</span>
                      <div className="absolute -top-1 -right-1 h-2 w-2 bg-indigo-500 rounded-full animate-pulse" />
                    </div>
                  ) : (
                    <span className="text-xs">{dayNumber}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!courseProgress.is_active && !courseProgress.started_at && (
        <div className="text-center py-8 text-slate-500">
          <BookOpen className="h-12 w-12 mx-auto mb-3 text-slate-300" />
          <p className="text-sm">Пользователь ещё не начал курс</p>
        </div>
      )}
    </div>
  )
}
