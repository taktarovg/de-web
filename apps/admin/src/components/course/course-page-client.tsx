'use client'

import { useState } from 'react'
import { StatsCard } from '@/components/stats-card'
import { DayDistributionChart } from './day-distribution-chart'
import { ActivityChart } from './activity-chart'
import { CompletionStatsChart } from './completion-stats-chart'
import { 
  BookOpen, 
  Users, 
  CheckCircle, 
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Search
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

interface Student {
  id: string
  userId: string
  name: string
  telegramId: string
  currentDay: number
  completionPercentage: number
  completedDays: number[]
  isActive: boolean
  startedAt: Date
  completedAt: Date | null
  lastAccessedAt: Date
}

interface CoursePageClientProps {
  stats: {
    totalEnrolled: number
    activeStudents: number
    completedCourses: number
    avgProgress: number
  }
  students: Student[]
  dayDistribution: Array<{ day: number; students: number }>
  activityData: Array<{ date: string; activeStudents: number }>
  completionStats: Array<{ range: string; count: number }>
}

export function CoursePageClient({
  stats,
  students,
  dayDistribution,
  activityData,
  completionStats
}: CoursePageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all')

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.telegramId.includes(searchQuery)
    
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'active' && student.isActive && !student.completedAt) ||
      (filterStatus === 'completed' && student.completedAt !== null)
    
    return matchesSearch && matchesFilter
  })

  const getProgressColor = (day: number) => {
    if (day <= 10) return 'bg-green-500'
    if (day <= 20) return 'bg-yellow-500'
    return 'bg-blue-500'
  }

  const getProgressLabel = (day: number) => {
    const progress = (day / 30) * 100
    if (progress < 33) return 'Начало'
    if (progress < 66) return 'В процессе'
    return 'Почти готово'
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Курс "Дневник Эмоций"</h1>
        <p className="text-slate-600 mt-1">30 дней практики эмоционального интеллекта</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Записано студентов" 
          value={stats.totalEnrolled} 
          icon={Users} 
          description="Всего начали курс" 
        />
        <StatsCard 
          title="Активные студенты" 
          value={stats.activeStudents} 
          icon={BookOpen} 
          description="Проходят сейчас" 
        />
        <StatsCard 
          title="Завершили курс" 
          value={stats.completedCourses} 
          icon={CheckCircle} 
          description="30/30 дней" 
        />
        <StatsCard 
          title="Средний прогресс" 
          value={`${stats.avgProgress}%`} 
          icon={TrendingUp} 
          description="По всем студентам" 
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Day Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">Распределение по дням</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Сколько студентов на каком дне курса
          </p>
          {dayDistribution.length > 0 ? (
            <DayDistributionChart data={dayDistribution} />
          ) : (
            <div className="h-[300px] flex items-center justify-center text-slate-400">
              Нет данных для отображения
            </div>
          )}
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold">Активность за неделю</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Количество активных студентов по дням
          </p>
          {activityData.length > 0 ? (
            <ActivityChart data={activityData} />
          ) : (
            <div className="h-[250px] flex items-center justify-center text-slate-400">
              Нет данных для отображения
            </div>
          )}
        </div>
      </div>

      {/* Completion Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold">Статистика завершения</h2>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Распределение студентов по этапам курса
        </p>
        {completionStats.length > 0 ? (
          <CompletionStatsChart data={completionStats} />
        ) : (
          <div className="h-[300px] flex items-center justify-center text-slate-400">
            Нет данных для отображения
          </div>
        )}
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Прогресс студентов</h2>
            <p className="text-sm text-slate-600 mt-1">
              {filteredStudents.length} из {students.length} студентов
            </p>
          </div>

          <div className="flex gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Поиск по имени или ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Все студенты</option>
              <option value="active">Активные</option>
              <option value="completed">Завершили</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-3 text-sm font-medium text-slate-600">Студент</th>
                <th className="pb-3 text-sm font-medium text-slate-600">Текущий день</th>
                <th className="pb-3 text-sm font-medium text-slate-600">Прогресс</th>
                <th className="pb-3 text-sm font-medium text-slate-600">Статус</th>
                <th className="pb-3 text-sm font-medium text-slate-600">Начал</th>
                <th className="pb-3 text-sm font-medium text-slate-600">Последний визит</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Студенты не найдены
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-slate-900">{student.name}</p>
                        <p className="text-sm text-slate-500">ID: {student.telegramId}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-900">
                          {student.currentDay}
                        </span>
                        <span className="text-sm text-slate-500">/ 30</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getProgressColor(student.currentDay)} transition-all`}
                              style={{ width: `${(student.currentDay / 30) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700">
                            {Math.round((student.currentDay / 30) * 100)}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{getProgressLabel(student.currentDay)}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      {student.completedAt ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Завершён
                        </span>
                      ) : student.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          <BookOpen className="w-3 h-3" />
                          Активен
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                          <Clock className="w-3 h-3" />
                          Неактивен
                        </span>
                      )}
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-slate-600">
                        {format(new Date(student.startedAt), 'dd MMM yyyy', { locale: ru })}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-slate-600">
                        {formatDistanceToNow(new Date(student.lastAccessedAt), { 
                          addSuffix: true, 
                          locale: ru 
                        })}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
