import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Flame, TrendingUp, Heart, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  UserHeader,
  UserStats,
  EmotionDistributionChart,
  RecentAnalysesTable,
  CourseProgressSection,
  EmotionTrendChart
} from '@/components/users/user-detail'

async function getUserDetails(telegramId: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  
  try {
    const response = await fetch(`${API_URL}/api/users/${telegramId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching user details:', error)
    return null
  }
}

interface PageProps {
  params: {
    telegramId: string
  }
}

export default async function UserDetailPage({ params }: PageProps) {
  const userData = await getUserDetails(params.telegramId)
  
  if (!userData) {
    notFound()
  }

  const { user, streaks, reminders, analysis_stats, category_distribution, top_emotions, course_progress, recent_analyses, chart_data } = userData

  return (
    <div className="p-8 space-y-6">
      {/* Back Button */}
      <Link href="/dream/users">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к списку пользователей
        </Button>
      </Link>

      {/* User Header */}
      <UserHeader user={user} />

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Analyses */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
            </div>
            <Badge variant="secondary">{analysis_stats.last_7_days} за 7 дней</Badge>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{analysis_stats.total}</p>
          <p className="text-sm text-slate-600">Всего анализов</p>
        </div>

        {/* Current Streak */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Flame className="h-5 w-5 text-orange-600" />
            </div>
            <Badge variant="secondary">макс. {streaks.longest_streak}</Badge>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{streaks.current_streak}</p>
          <p className="text-sm text-slate-600">Текущий стрик</p>
        </div>

        {/* Average Level */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <Badge variant={analysis_stats.avg_level >= 200 ? 'success' : 'secondary'}>
              {analysis_stats.avg_level >= 200 ? 'Позитив' : 'Работаем'}
            </Badge>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {Math.round(analysis_stats.avg_level)}
          </p>
          <p className="text-sm text-slate-600">Средний уровень эмоций</p>
        </div>

        {/* Unique Days */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <Badge variant="secondary">{analysis_stats.last_30_days} за 30 дней</Badge>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{analysis_stats.unique_days}</p>
          <p className="text-sm text-slate-600">Уникальных дней</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emotion Trend Chart */}
        <EmotionTrendChart chartData={chart_data} />
        
        {/* Category Distribution */}
        <EmotionDistributionChart categoryDistribution={category_distribution} />
      </div>

      {/* Top Emotions */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Heart className="h-5 w-5 mr-2 text-rose-500" />
          Топ-5 эмоций пользователя
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {top_emotions.map((emotion: any, index: number) => (
            <div key={index} className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
              <span className="text-3xl mb-2">{emotion.emotion_emoji}</span>
              <p className="font-medium text-slate-900 text-center text-sm">{emotion.emotion_name}</p>
              <p className="text-xs text-slate-500 mt-1">{emotion.category_name}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {emotion.count} раз
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ур. {Math.round(emotion.avg_level)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Progress */}
      <CourseProgressSection courseProgress={course_progress} />

      {/* Recent Analyses Table */}
      <RecentAnalysesTable analyses={recent_analyses} />

      {/* Settings Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">⚙️ Настройки пользователя</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Напоминания</p>
              <p className="text-sm text-slate-600">
                {reminders.enabled ? (
                  <span>
                    Включены: 
                    {reminders.morning_time && ` Утро ${reminders.morning_time}`}
                    {reminders.afternoon_time && ` День ${reminders.afternoon_time}`}
                    {reminders.evening_time && ` Вечер ${reminders.evening_time}`}
                  </span>
                ) : 'Отключены'}
              </p>
            </div>
            <Badge variant={reminders.enabled ? 'success' : 'secondary'}>
              {reminders.enabled ? 'Вкл' : 'Выкл'}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Часовой пояс</p>
              <p className="text-sm text-slate-600">{user.timezone || 'UTC'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
