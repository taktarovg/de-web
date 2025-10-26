import { prisma } from '@designemotion/database'
import { EmotionsPageClient } from '@/components/emotions/emotions-page-client'

async function getEmotions() {
  const emotions = await prisma.emotion.findMany({
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    select: {
      id: true,
      name: true,
      emoji: true,
      category: true,
      level: true,
      description: true,
      isActive: true,
      _count: {
        select: { analyses: true },
      },
    },
  })
  return emotions
}

async function getCategories() {
  const categories = await prisma.emotionCategory.findMany({
    orderBy: { sortOrder: 'asc' },
  })
  // Map and handle null values
  return categories.map(c => ({
    ...c,
    description: c.description || '',
    sortOrder: c.sortOrder || 0,
    colorHex: c.colorHex || '#000000',
  }))
}

async function getEmotionStats() {
  const [total, active, totalUsage, mostUsed] = await Promise.all([
    prisma.emotion.count(),
    prisma.emotion.count({ where: { isActive: true } }),
    prisma.analysis.count(),
    prisma.emotion.findMany({
      take: 1,
      orderBy: {
        analyses: {
          _count: 'desc'
        }
      },
      select: {
        name: true,
        emoji: true,
        _count: {
          select: { analyses: true }
        }
      }
    })
  ])
  
  return { 
    total, 
    active, 
    totalUsage,
    mostUsedEmotion: mostUsed[0] || null
  }
}

export default async function EmotionsPage() {
  const [emotions, categories, stats] = await Promise.all([
    getEmotions(),
    getCategories(),
    getEmotionStats(),
  ])

  return (
    <EmotionsPageClient 
      initialEmotions={emotions}
      categories={categories}
      stats={stats}
    />
  )
}
