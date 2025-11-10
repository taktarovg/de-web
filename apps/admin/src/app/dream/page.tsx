import { prisma } from '@designemotion/database'
import { StatsCard } from '@/components/stats-card'
import { RecentActivity } from '@/components/recent-activity'
import { Users, Heart, BookOpen, TrendingUp } from 'lucide-react'

// Отключаем кэширование - данные будут всегда свежими
export const revalidate = 0

async function getStats() {
  try {
    const [totalUsers, totalAnalyses, activeUsers, coursesInProgress] = await Promise.all([
      prisma.user.count(),
      prisma.analysis.count(),
      prisma.user.count({
        where: {
          lastCheckinDate: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.courseProgress.count({
        where: {
          isActive: true,
        },
      }),
    ])

    return { totalUsers, totalAnalyses, activeUsers, coursesInProgress, error: null }
  } catch (error) {
    console.error('Database error:', error)
    return {
      totalUsers: 0,
      totalAnalyses: 0,
      activeUsers: 0,
      coursesInProgress: 0,
      error: 'Failed to fetch stats from database',
    }
  }
}

export default async function DreamDashboard() {
  const stats = await getStats()

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Обзор проекта Дизайн Эмоций</p>
      </div>

      {stats.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            ⚠️ Ошибка подключения к базе данных. Проверьте DATABASE_URL в .env
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Всего пользователей"
          value={stats.totalUsers}
          icon={Users}
          description="Зарегистрировано в боте"
        />
        <StatsCard
          title="Активные пользователи"
          value={stats.activeUsers}
          icon={TrendingUp}
          description="За последние 7 дней"
        />
        <StatsCard
          title="Эмоциональные анализы"
          value={stats.totalAnalyses}
          icon={Heart}
          description="Всего чек-инов"
        />
        <StatsCard
          title="Курсы в процессе"
          value={stats.coursesInProgress}
          icon={BookOpen}
          description="Дневник эмоций"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Последняя активность</h2>
        <RecentActivity />
      </div>
    </div>
  )
}
