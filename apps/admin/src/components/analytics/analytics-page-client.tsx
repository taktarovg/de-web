'use client'

import { ActivityChart } from './activity-chart'
import { LevelsChart } from './levels-chart'
import { TopEmotionsChart } from './top-emotions-chart'
import { TrendingUp, TrendingDown, Activity, Heart } from 'lucide-react'

interface AnalyticsPageClientProps {
  activityData: Array<{
    date: string
    count: number
    avgLevel: number
  }>
  levelsData: Array<{
    range: string
    count: number
    color: string
  }>
  topEmotions: Array<{
    name: string
    emoji: string
    category: string
    count: number
  }>
  stats: {
    totalCount: number
    avgLevel: number
    categoryDist: Array<{
      category: string
      count: number
    }>
  }
}

const CATEGORY_INFO = {
  'апатия': { emoji: '😶', level: 50, color: '#64748b' },
  'печаль': { emoji: '😢', level: 75, color: '#3b82f6' },
  'страх': { emoji: '😨', level: 100, color: '#eab308' },
  'вожделение': { emoji: '🤤', level: 125, color: '#f97316' },
  'злость': { emoji: '😡', level: 150, color: '#ef4444' },
  'гордыня': { emoji: '😏', level: 175, color: '#a855f7' },
  'мужество': { emoji: '💪', level: 200, color: '#6366f1' },
  'принятие': { emoji: '🤗', level: 350, color: '#22c55e' },
  'умиротворение': { emoji: '🙏', level: 600, color: '#14b8a6' },
}

export function AnalyticsPageClient({
  activityData,
  levelsData,
  topEmotions,
  stats,
}: AnalyticsPageClientProps) {
  const topEmotion = topEmotions[0]
  const trend = activityData.length > 1
    ? activityData[activityData.length - 1].count - activityData[0].count
    : 0

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Аналитика</h1>
        <p className="text-slate-600 mt-1">
          Глубокий анализ эмоциональных данных за последние 30 дней
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Всего анализов</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {stats.totalCount}
              </p>
            </div>
            <Activity className="w-10 h-10 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Средний уровень</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {stats.avgLevel}
              </p>
            </div>
            <Heart className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Топ эмоция</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {topEmotion?.emoji} {topEmotion?.name}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Тренд</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-3xl font-bold text-slate-900">
                  {trend > 0 ? '+' : ''}{trend}
                </p>
                {trend > 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-500" />
                ) : trend < 0 ? (
                  <TrendingDown className="w-6 h-6 text-red-500" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Активность по дням</h2>
        <ActivityChart data={activityData} />
      </div>

      {/* Levels Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold mb-4">
          Распределение по уровням Хокинса
        </h2>
        <LevelsChart data={levelsData} />
      </div>

      {/* Top Emotions */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Топ-10 эмоций</h2>
        <TopEmotionsChart data={topEmotions} />
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold mb-4">
          Распределение по категориям
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {stats.categoryDist.map((cat) => {
            const info = CATEGORY_INFO[cat.category as keyof typeof CATEGORY_INFO]
            const percentage = ((cat.count / stats.totalCount) * 100).toFixed(1)

            return (
              <div
                key={cat.category}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                style={{ borderLeftColor: info?.color, borderLeftWidth: '4px' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{info?.emoji}</span>
                  <span className="text-2xl font-bold text-slate-900">
                    {cat.count}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900 capitalize">
                  {cat.category}
                </p>
                <p className="text-xs text-slate-500">
                  {percentage}% • Уровень {info?.level}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
