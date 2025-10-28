import { prisma } from '@designemotion/database'
import { BroadcastsPageClient } from '@/components/broadcasts/broadcasts-page-client'

// Отключаем кэширование - данные будут всегда свежими
export const revalidate = 0

async function getBroadcasts() {
  const broadcasts = await prisma.broadcast.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 50
  })

  return broadcasts.map(b => ({
    ...b,
    successRate: Number(b.successRate),
  }))
}

async function getBroadcastStats() {
  const [total, completed, sending, scheduled] = await Promise.all([
    prisma.broadcast.count(),
    prisma.broadcast.count({ where: { status: 'completed' } }),
    prisma.broadcast.count({ where: { status: 'sending' } }),
    prisma.broadcast.count({ where: { status: 'scheduled' } }),
  ])

  const totalSent = await prisma.broadcast.aggregate({
    _sum: { sentCount: true }
  })

  const totalUsers = await prisma.user.count()
  // TODO: Add notificationsEnabled filter when column exists
  // where: { notificationsEnabled: true }

  return {
    total,
    completed,
    sending,
    scheduled,
    totalSent: totalSent._sum.sentCount || 0,
    totalUsers,
  }
}

export default async function BroadcastsPage() {
  const [broadcasts, stats] = await Promise.all([
    getBroadcasts(),
    getBroadcastStats(),
  ])

  return <BroadcastsPageClient broadcasts={broadcasts} stats={stats} />
}
