import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Flame, TrendingUp, Heart, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SendMessageDialog } from '@/components/users/send-message-dialog'
import { Badge } from '@/components/ui/badge'
import { 
  UserHeader,
  UserStats,
  EmotionDistributionChart,
  RecentAnalysesTable,
  CourseProgressSection,
  EmotionTrendChart
} from '@/components/users/user-detail'
import { MessageHistory } from '@/components/users/message-history'
import { prisma } from '@ecosystem/database'

// Отключаем кэширование - данные всегда свежие
export const revalidate = 0

async function getUserDetails(telegramId: string) {
  try {
    // Используем Prisma напрямую вместо fetch (оптимизация для Server Component)
    const user = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) },
      select: {
        id: true,
        telegramId: true,
        username: true,
        firstName: true,
        languageCode: true,
        timezone: true,
        isProgramActive: true,
        totalCheckins: true,
        totalSessions: true,
        currentStreak: true,
        longestStreak: true,
        lastCheckinDate: true,
        programStartDate: true,
        currentMonth: true,
        currentWeek: true,
        createdAt: true,
        updatedAt: true,
        reminderEnabled: true,
        reminderCount: true,
        morningTime: true,
        afternoonTime: true,
        eveningTime: true,
      },
    })

    if (!user) {
      return null
    }

    // Статистика анализов
    const analysisStats = await prisma.analysis.aggregate({
      where: { userId: user.id },
      _count: { id: true },
      _avg: { emotionLevel: true },
    })

    const [last7DaysCount, last30DaysCount, uniqueDays] = await Promise.all([
      prisma.analysis.count({
        where: {
          userId: user.id,
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.analysis.count({
        where: {
          userId: user.id,
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(DISTINCT DATE(created_at)) as count
        FROM analyses WHERE user_id = ${user.id}::uuid
      `,
    ])

    // Распределение по категориям
    const categoryDistribution = await prisma.analysis.groupBy({
      by: ['emotionCategory'],
      where: { userId: user.id },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    })

    // Топ-5 эмоций
    const topEmotions = await prisma.$queryRaw<any[]>`
      SELECT 
        e.name as emotion_name,
        e.emoji as emotion_emoji,
        e.category as category_name,
        COUNT(a.id) as count,
        AVG(a.emotion_level) as avg_level
      FROM analyses a
      INNER JOIN emotions e ON a.emotion_id = e.id
      WHERE a.user_id = ${user.id}::uuid
      GROUP BY e.name, e.emoji, e.category
      ORDER BY COUNT(a.id) DESC
      LIMIT 5
    `

    // Прогресс курса
    const courseProgress = await prisma.courseProgress.findUnique({
      where: { userId: user.id },
    })

    // Последние анализы
    const recentAnalyses = await prisma.analysis.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        emotionId: true,
        emotionLevel: true,
        emotionCategory: true,
        customEmotionText: true,
        createdAt: true,
        emotion: {
          select: { name: true, emoji: true, category: true, level: true },
        },
      },
    })

    // График за 30 дней
    const chartData = await prisma.$queryRaw<any[]>`
      SELECT 
        DATE(created_at) as date,
        COUNT(id) as count,
        AVG(emotion_level) as avg_level
      FROM analyses
      WHERE user_id = ${user.id}::uuid
        AND created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `

    // Получаем метаданные категорий для emoji
    const categories = await prisma.emotionCategory.findMany({
      select: {
        name: true,
        emoji: true,
      },
    })
    const categoryMap = Object.fromEntries(
      categories.map(c => [c.name, c.emoji])
    )

    // Форматирование
    return {
      user: {
        telegram_id: user.telegramId.toString(),
        username: user.username || null,
        first_name: user.firstName || null,
        last_name: null, // Нет в схеме
        full_name: user.firstName || 'Без имени',
        language_code: user.languageCode || 'ru',
        timezone: user.timezone || 'Europe/Moscow',
        is_program_active: user.isProgramActive,
        created_at: user.createdAt.toISOString(),
        updated_at: user.updatedAt.toISOString(),
      },
      streaks: {
        current_streak: user.currentStreak,
        longest_streak: user.longestStreak,
      },
      reminders: {
        enabled: user.reminderEnabled,
        count: user.reminderCount,
        morning_time: user.morningTime,
        afternoon_time: user.afternoonTime,
        evening_time: user.eveningTime,
      },
      analysis_stats: {
        total: analysisStats._count.id,
        last_7_days: last7DaysCount,
        last_30_days: last30DaysCount,
        unique_days: Number(uniqueDays[0]?.count || 0),
        avg_level: Math.round(analysisStats._avg.emotionLevel || 0),
      },
      category_distribution: categoryDistribution.map(item => {
        const categoryName = item.emotionCategory || 'unknown'
        return {
          category: categoryName,
          category_name: categoryName,
          category_emoji: categoryMap[categoryName] || '❓',
          count: item._count.id,
          avg_level: 0, // Будет вычислено позже если нужно
          percentage: Math.round((item._count.id / analysisStats._count.id) * 100),
        }
      }),
      top_emotions: topEmotions.map(e => ({
        emotion_name: e.emotion_name,
        emotion_emoji: e.emotion_emoji,
        category_name: e.category_name,
        count: Number(e.count),
        avg_level: Math.round(Number(e.avg_level)),
      })),
      course_progress: courseProgress ? {
        total_days: 21,
        current_day: courseProgress.currentDay,
        completed_days_count: courseProgress.completedDays.length,
        completed_days: courseProgress.completedDays,
        is_active: courseProgress.isActive,
        started_at: courseProgress.startedAt.toISOString(),
        completed_at: courseProgress.completedAt?.toISOString() || null,
        total_lessons_completed: courseProgress.completedDays.length,
        completion_percentage: courseProgress.completionPercentage,
      } : {
        total_days: 21,
        current_day: 0,
        completed_days_count: 0,
        completed_days: [],
        is_active: false,
        started_at: null,
        completed_at: null,
        total_lessons_completed: 0,
        completion_percentage: 0,
      },
      recent_analyses: recentAnalyses.map(a => {
        const categoryName = a.emotionCategory || 'unknown'
        return {
          id: a.id,
          emotion_id: a.emotionId || '',
          emotion_name: a.emotion?.name || a.customEmotionText || 'Не указано',
          emotion_emoji: a.emotion?.emoji || '❓',
          emotion_level: a.emotionLevel || 0,
          category_name: categoryName,
          category_emoji: categoryMap[categoryName] || '❓',
          created_at: a.createdAt?.toISOString() || new Date().toISOString(),
        }
      }),
      chart_data: chartData.map(d => ({
        date: d.date,
        count: Number(d.count),
        avg_level: Math.round(Number(d.avg_level || 0)),
      })),
    }
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
      {/* Header with Back Button and Send Message */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/dream/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к списку пользователей
          </Button>
        </Link>
        
        <SendMessageDialog 
          telegramId={params.telegramId} 
          userName={user.first_name || undefined}
        />
      </div>

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

      {/* Message History - NEW */}
      <MessageHistory telegramId={params.telegramId} />

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
