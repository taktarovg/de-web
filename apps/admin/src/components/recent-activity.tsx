import { prisma } from '@designemotion/database'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

async function getRecentActivity() {
  const analyses = await prisma.analysis.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: {
      user: {
        select: {
          firstName: true,
          username: true,
        },
      },
      emotion: {
        select: {
          name: true,
          emoji: true,
        },
      },
    },
  })

  return analyses
}

export async function RecentActivity() {
  const activities = await getRecentActivity()

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
          <div className="text-2xl">{activity.emotion?.emoji || '❓'}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900">
              {activity.user.firstName || activity.user.username || 'Пользователь'}
            </p>
            <p className="text-sm text-slate-600 truncate">
              Эмоция: {activity.emotion?.name || 'не указана'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {formatDistanceToNow(activity.createdAt, { addSuffix: true, locale: ru })}
            </p>
          </div>
          <div className="text-sm font-medium text-slate-600">
            {activity.emotionLevel || '—'}
          </div>
        </div>
      ))}
    </div>
  )
}
