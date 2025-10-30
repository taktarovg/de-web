import { prisma } from '@designemotion/database'
import { CoursePageClient } from '@/components/course/course-page-client'
import { subDays } from 'date-fns'

// Отключаем кэширование - данные будут всегда свежими
export const revalidate = 0

async function getCourseStats() {
  const [totalEnrolled, activeStudents, completedCourses, avgProgress] = await Promise.all([
    prisma.courseProgress.count(),
    prisma.courseProgress.count({ where: { isActive: true } }),
    prisma.courseProgress.count({ where: { completedAt: { not: null } } }),
    prisma.courseProgress.aggregate({ _avg: { completionPercentage: true } }),
  ])

  return {
    totalEnrolled,
    activeStudents,
    completedCourses,
    avgProgress: Math.round(avgProgress._avg.completionPercentage || 0),
  }
}

async function getStudentsProgress() {
  const students = await prisma.courseProgress.findMany({
    include: {
      user: {
        select: {
          firstName: true,
          telegramId: true,
          createdAt: true,
        }
      }
    },
    orderBy: {
      currentDay: 'desc'
    }
  })

  return students.map(student => ({
    id: student.id,
    userId: student.userId,
    name: student.user.firstName || 'Не указано',
    telegramId: student.user.telegramId.toString(),
    currentDay: student.currentDay,
    completionPercentage: student.completionPercentage,
    completedDays: student.completedDays,
    isActive: student.isActive,
    startedAt: student.startedAt,
    completedAt: student.completedAt,
    lastAccessedAt: student.lastAccessedAt,
  }))
}

async function getDayDistribution() {
  // Группируем студентов по текущему дню
  const distribution = await prisma.$queryRaw<Array<{
    current_day: number
    count: bigint
  }>>`
    SELECT current_day, COUNT(*) as count
    FROM course_progress
    WHERE is_active = true
    GROUP BY current_day
    ORDER BY current_day
  `

  return distribution.map(item => ({
    day: item.current_day,
    students: Number(item.count)
  }))
}

async function getActivityData() {
  const sevenDaysAgo = subDays(new Date(), 7)
  
  const activityByDay = await prisma.$queryRaw<Array<{
    date: Date
    active_count: bigint
  }>>`
    SELECT 
      DATE(last_accessed_at) as date,
      COUNT(DISTINCT user_id) as active_count
    FROM course_progress
    WHERE last_accessed_at >= ${sevenDaysAgo}
      AND is_active = true
    GROUP BY DATE(last_accessed_at)
    ORDER BY date
  `

  return activityByDay.map(item => ({
    date: item.date.toISOString().split('T')[0],
    activeStudents: Number(item.active_count)
  }))
}

async function getCompletionStats() {
  // Статистика по завершению дней
  const stats = await prisma.$queryRaw<Array<{
    days_range: string
    count: bigint
  }>>`
    SELECT 
      CASE 
        WHEN current_day <= 5 THEN '1-5 дней'
        WHEN current_day <= 10 THEN '6-10 дней'
        WHEN current_day <= 15 THEN '11-15 дней'
        WHEN current_day <= 20 THEN '16-20 дней'
        WHEN current_day <= 25 THEN '21-25 дней'
        ELSE '26-30 дней'
      END as days_range,
      COUNT(*) as count
    FROM course_progress
    WHERE is_active = true
    GROUP BY 
      CASE 
        WHEN current_day <= 5 THEN '1-5 дней'
        WHEN current_day <= 10 THEN '6-10 дней'
        WHEN current_day <= 15 THEN '11-15 дней'
        WHEN current_day <= 20 THEN '16-20 дней'
        WHEN current_day <= 25 THEN '21-25 дней'
        ELSE '26-30 дней'
      END
    ORDER BY 
      MIN(CASE 
        WHEN current_day <= 5 THEN 1
        WHEN current_day <= 10 THEN 2
        WHEN current_day <= 15 THEN 3
        WHEN current_day <= 20 THEN 4
        WHEN current_day <= 25 THEN 5
        ELSE 6
      END)
  `

  return stats.map(item => ({
    range: item.days_range,
    count: Number(item.count)
  }))
}

export default async function CoursePage() {
  const [stats, students, dayDistribution, activityData, completionStats] = await Promise.all([
    getCourseStats(),
    getStudentsProgress(),
    getDayDistribution(),
    getActivityData(),
    getCompletionStats()
  ])

  return (
    <CoursePageClient 
      stats={stats}
      students={students}
      dayDistribution={dayDistribution}
      activityData={activityData}
      completionStats={completionStats}
    />
  )
}
