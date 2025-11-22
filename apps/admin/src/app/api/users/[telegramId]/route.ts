import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@designemotion/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { telegramId: string } }
) {
  try {
    const { telegramId } = params

    // 1. Получить основные данные пользователя
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
        // Напоминания
        reminderEnabled: true,
        reminderCount: true,
        morningTime: true,
        afternoonTime: true,
        eveningTime: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // 2. Статистика анализов
    const analysisStats = await prisma.analysis.aggregate({
      where: { userId: user.id },
      _count: { id: true },
      _avg: { emotionLevel: true },
    })

    const last7DaysCount = await prisma.analysis.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    })

    const last30DaysCount = await prisma.analysis.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    })

    // Уникальные дни с анализами
    const uniqueDays = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(DISTINCT DATE(created_at)) as count
      FROM analyses
      WHERE user_id = ${user.id}::uuid
    `

    // 3. Распределение по категориям
    const categoryDistribution = await prisma.analysis.groupBy({
      by: ['emotionCategory'],
      where: { userId: user.id },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    })

    // 4. Топ-5 эмоций
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

    // 5. Прогресс курса
    const courseProgress = await prisma.courseProgress.findUnique({
      where: { userId: user.id },
      select: {
        currentDay: true,
        completedDays: true,
        completionPercentage: true,
        isActive: true,
        startedAt: true,
        lastAccessedAt: true,
        completedAt: true,
      },
    })

    // 6. Последние 10 анализов
    const recentAnalyses = await prisma.analysis.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        emotionLevel: true,
        emotionCategory: true,
        customEmotionText: true,
        situationBrief: true,
        acceptanceRating: true,
        releaseRating: true,
        analysisType: true,
        createdAt: true,
        emotion: {
          select: {
            name: true,
            emoji: true,
            category: true,
            level: true,
          },
        },
      },
    })

    // 7. Данные для графика (последние 30 дней)
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

    // 8. Форматирование данных для ответа
    const formattedUser = {
      ...user,
      telegram_id: user.telegramId.toString(),
      username: user.username || null,
      first_name: user.firstName || null,
      language_code: user.languageCode || 'ru',
      timezone: user.timezone || 'Europe/Moscow',
      is_program_active: user.isProgramActive,
      total_checkins: user.totalCheckins,
      total_sessions: user.totalSessions,
      current_streak: user.currentStreak,
      longest_streak: user.longestStreak,
      last_checkin_date: user.lastCheckinDate,
      program_start_date: user.programStartDate,
      current_month: user.currentMonth,
      current_week: user.currentWeek,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    }

    const formattedStreaks = {
      current_streak: user.currentStreak,
      longest_streak: user.longestStreak,
    }

    const formattedReminders = {
      enabled: user.reminderEnabled,
      count: user.reminderCount,
      morning_time: user.morningTime,
      afternoon_time: user.afternoonTime,
      evening_time: user.eveningTime,
    }

    const formattedAnalysisStats = {
      total: analysisStats._count.id,
      last_7_days: last7DaysCount,
      last_30_days: last30DaysCount,
      unique_days: Number(uniqueDays[0]?.count || 0),
      avg_level: Math.round(analysisStats._avg.emotionLevel || 0),
    }

    const formattedCategoryDistribution = categoryDistribution.map(item => ({
      category: item.emotionCategory || 'unknown',
      count: item._count.id,
      percentage: Math.round((item._count.id / analysisStats._count.id) * 100),
    }))

    const formattedTopEmotions = topEmotions.map(emotion => ({
      emotion_name: emotion.emotion_name,
      emotion_emoji: emotion.emotion_emoji,
      category_name: emotion.category_name,
      count: Number(emotion.count),
      avg_level: Math.round(Number(emotion.avg_level)),
    }))

    const formattedRecentAnalyses = recentAnalyses.map(analysis => ({
      id: analysis.id,
      emotion_name: analysis.emotion?.name || analysis.customEmotionText || 'Не указано',
      emotion_emoji: analysis.emotion?.emoji || '❓',
      emotion_level: analysis.emotionLevel,
      emotion_category: analysis.emotionCategory || 'unknown',
      situation_brief: analysis.situationBrief,
      acceptance_rating: analysis.acceptanceRating,
      release_rating: analysis.releaseRating,
      analysis_type: analysis.analysisType,
      created_at: analysis.createdAt,
    }))

    const formattedChartData = chartData.map(day => ({
      date: day.date,
      count: Number(day.count),
      avg_level: Math.round(Number(day.avg_level || 0)),
    }))

    // 9. Финальный ответ
    return NextResponse.json({
      success: true,
      data: {
        user: formattedUser,
        streaks: formattedStreaks,
        reminders: formattedReminders,
        analysis_stats: formattedAnalysisStats,
        category_distribution: formattedCategoryDistribution,
        top_emotions: formattedTopEmotions,
        course_progress: courseProgress || {
          currentDay: 0,
          completedDays: [],
          totalLessonsCompleted: 0,
          completionPercentage: 0,
          isActive: false,
          startedAt: null,
          lastAccessedAt: null,
          completedAt: null,
        },
        recent_analyses: formattedRecentAnalyses,
        chart_data: formattedChartData,
      },
    })
  } catch (error) {
    console.error('Error fetching user details:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user details',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
