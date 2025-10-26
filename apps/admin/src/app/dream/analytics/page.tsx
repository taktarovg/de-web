import { prisma } from '@designemotion/database'
import { AnalyticsPageClient } from '@/components/analytics/analytics-page-client'
import { subDays, format } from 'date-fns'

async function getActivityData() {
  const thirtyDaysAgo = subDays(new Date(), 30)
  
  const analyses = await prisma.analysis.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo
      }
    },
    select: {
      createdAt: true,
      emotionLevel: true,
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  // Group by date
  const grouped = analyses.reduce((acc, item) => {
    if (!item.createdAt || item.emotionLevel === null) return acc; // Skip if createdAt or emotionLevel is null
    const date = format(item.createdAt, 'yyyy-MM-dd')
    if (!acc[date]) {
      acc[date] = { count: 0, totalLevel: 0 }
    }
    acc[date].count++
    acc[date].totalLevel += item.emotionLevel
    return acc
  }, {} as Record<string, { count: number; totalLevel: number }>)

  // Convert to array
  return Object.entries(grouped).map(([date, data]) => ({
    date,
    count: data.count,
    avgLevel: Math.round(data.totalLevel / data.count)
  }))
}

async function getLevelsDistribution() {
  const thirtyDaysAgo = subDays(new Date(), 30)
  
  const analyses = await prisma.analysis.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo
      }
    },
    select: {
      emotionLevel: true,
    }
  })

  // Group by level ranges
  const ranges = [
    { min: 20, max: 74, label: '20-74 (Апатия)', color: '#64748b' },
    { min: 75, max: 99, label: '75-99 (Печаль)', color: '#3b82f6' },
    { min: 100, max: 124, label: '100-124 (Страх)', color: '#eab308' },
    { min: 125, max: 149, label: '125-149 (Вожделение)', color: '#f97316' },
    { min: 150, max: 174, label: '150-174 (Злость)', color: '#ef4444' },
    { min: 175, max: 199, label: '175-199 (Гордыня)', color: '#a855f7' },
    { min: 200, max: 349, label: '200-349 (Мужество)', color: '#6366f1' },
    { min: 350, max: 539, label: '350-539 (Принятие)', color: '#22c55e' },
    { min: 540, max: 1000, label: '540+ (Умиротворение)', color: '#14b8a6' },
  ]

  return ranges.map(range => ({
    range: range.label,
    count: analyses.filter(a => a.emotionLevel !== null && a.emotionLevel >= range.min && a.emotionLevel <= range.max).length,
    color: range.color
  }))
}

async function getTopEmotions() {
  const thirtyDaysAgo = subDays(new Date(), 30)
  
  const topEmotions = await prisma.analysis.groupBy({
    by: ['emotionId'],
    where: {
      createdAt: {
        gte: thirtyDaysAgo
      }
    },
    _count: {
      id: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: 10
  })

  // Get emotion details
  const emotionIds = topEmotions.map(e => e.emotionId).filter((id): id is string => id !== null)
  const emotions = await prisma.emotion.findMany({
    where: {
      id: {
        in: emotionIds
      }
    },
    select: {
      id: true,
      name: true,
      emoji: true,
      category: true,
    }
  })

  // Merge data
  return topEmotions.map(item => {
    const emotion = emotions.find(e => e.id === item.emotionId)
    return {
      name: emotion?.name || 'Unknown',
      emoji: emotion?.emoji || '❓',
      category: emotion?.category || 'unknown',
      count: item._count.id
    }
  })
}

async function getStats() {
  const thirtyDaysAgo = subDays(new Date(), 30)
  
  const [totalCount, avgLevel, categoryDist] = await Promise.all([
    prisma.analysis.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    }),
    prisma.analysis.aggregate({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      _avg: {
        emotionLevel: true
      }
    }),
    prisma.analysis.groupBy({
      by: ['emotionCategory'],
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      _count: {
        id: true
      }
    })
  ])

  return {
    totalCount,
    avgLevel: Math.round(avgLevel._avg.emotionLevel || 0),
    categoryDist: categoryDist
      .filter(c => c.emotionCategory !== null)
      .map(c => ({
        category: c.emotionCategory as string,
        count: c._count.id
      }))
  }
}

export default async function AnalyticsPage() {
  const [activityData, levelsData, topEmotions, stats] = await Promise.all([
    getActivityData(),
    getLevelsDistribution(),
    getTopEmotions(),
    getStats()
  ])

  return (
    <AnalyticsPageClient 
      activityData={activityData}
      levelsData={levelsData}
      topEmotions={topEmotions}
      stats={stats}
    />
  )
}
