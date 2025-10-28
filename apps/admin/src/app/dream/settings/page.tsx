export const revalidate = 0; // Отключаем кэширование

import { PrismaClient } from '@prisma/client'
import { SettingsPageClient } from '@/components/settings/settings-page-client'
import fs from 'fs'
import path from 'path'

// Создаём отдельный Prisma Client для raw queries
const prisma = new PrismaClient()

async function getSystemLogs(limit = 100) {
  try {
    // Читаем из реальной структуры таблицы: event_type, event_description, event_data, created_at
    const logs = await prisma.$queryRaw<Array<{
      id: string
      event_type: string
      event_description: string | null
      event_data: any
      created_at: Date
      user_id: string | null
    }>>`
      SELECT id, event_type, event_description, event_data, created_at, user_id
      FROM system_logs
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    
    // Преобразуем в формат, ожидаемый клиентом (level, message, context, timestamp)
    return logs.map(log => ({
      id: log.id,
      level: log.event_type || 'info',
      message: log.event_description || 'No message',
      context: log.event_data || {},
      timestamp: log.created_at,
      userId: log.user_id
    }))
  } catch (error) {
    console.error('Error fetching system logs:', error)
    return []
  }
}

async function getLogStats() {
  try {
    const [
      totalLogs,
      errorsToday,
      warningsToday,
      logsByLevel
    ] = await Promise.all([
      prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count FROM system_logs
      `,
      prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count
        FROM system_logs
        WHERE event_type LIKE '%error%'
          AND created_at >= NOW() - INTERVAL '1 day'
      `,
      prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count
        FROM system_logs
        WHERE event_type LIKE '%warning%'
          AND created_at >= NOW() - INTERVAL '1 day'
      `,
      prisma.$queryRaw<Array<{ event_type: string; count: bigint }>>`
        SELECT event_type, COUNT(*) as count
        FROM system_logs
        WHERE created_at >= NOW() - INTERVAL '7 days'
        GROUP BY event_type
      `
    ])
    
    return {
      totalLogs: Number(totalLogs[0]?.count || 0),
      errorsToday: Number(errorsToday[0]?.count || 0),
      warningsToday: Number(warningsToday[0]?.count || 0),
      logsByLevel: logsByLevel.map(item => ({
        level: item.event_type,
        count: Number(item.count)
      }))
    }
  } catch (error) {
    console.error('Error fetching log stats:', error)
    return {
      totalLogs: 0,
      errorsToday: 0,
      warningsToday: 0,
      logsByLevel: []
    }
  }
}

async function getFileLogs() {
  try {
    // Try multiple possible paths
    const possiblePaths = [
      path.join(process.cwd(), '../../de/logs'),
      path.join(process.cwd(), '../de/logs'),
      '/var/log/emotion-bot',
      '/home/bot/logs',
    ]
    
    let logsDir = null
    for (const dir of possiblePaths) {
      if (fs.existsSync(dir)) {
        logsDir = dir
        break
      }
    }
    
    if (!logsDir) {
      return { 
        errorLogs: [], 
        combinedLogs: [],
        available: false,
        message: 'Файловые логи недоступны (бот работает на сервере)'
      }
    }
    
    const errorLogPath = path.join(logsDir, 'error.log')
    const combinedLogPath = path.join(logsDir, 'combined.log')
    
    let errorLogs: string[] = []
    let combinedLogs: string[] = []
    
    if (fs.existsSync(errorLogPath)) {
      const errorContent = fs.readFileSync(errorLogPath, 'utf-8')
      errorLogs = errorContent
        .split('\n')
        .filter(line => line.trim())
        .slice(-50)
        .reverse()
    }
    
    if (fs.existsSync(combinedLogPath)) {
      const combinedContent = fs.readFileSync(combinedLogPath, 'utf-8')
      combinedLogs = combinedContent
        .split('\n')
        .filter(line => line.trim())
        .slice(-50)
        .reverse()
    }
    
    return { 
      errorLogs, 
      combinedLogs,
      available: true,
      path: logsDir
    }
  } catch (error) {
    console.error('Error reading log files:', error)
    return { 
      errorLogs: [], 
      combinedLogs: [],
      available: false,
      message: 'Ошибка чтения файловых логов'
    }
  }
}

async function getSystemStats() {
  try {
    const [totalUsers, totalAnalyses, activeUsersToday] = await Promise.all([
      prisma.user.count(),
      prisma.analysis.count(),
      prisma.user.count({
        where: {
          updatedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
    ])
    
    // Get last log entry to determine bot status
    const lastLog = await prisma.$queryRaw<Array<{ created_at: Date }>>`
      SELECT created_at
      FROM system_logs
      ORDER BY created_at DESC
      LIMIT 1
    `
    
    const lastLogTime = lastLog[0]?.created_at ? new Date(lastLog[0].created_at).getTime() : 0
    const now = Date.now()
    const fiveMinutesAgo = now - 5 * 60 * 1000
    
    // If last log is within 5 minutes, bot is probably online
    const botStatus = lastLogTime > fiveMinutesAgo ? 'online' : lastLogTime > 0 ? 'inactive' : 'unknown'
    
    return {
      totalUsers,
      totalAnalyses,
      activeUsersToday,
      botStatus,
      version: '2.0.0',
      uptime: process.uptime(),
      lastLogTime: lastLog[0]?.created_at || null
    }
  } catch (error) {
    console.error('Error fetching system stats:', error)
    return {
      totalUsers: 0,
      totalAnalyses: 0,
      activeUsersToday: 0,
      botStatus: 'unknown',
      version: '2.0.0',
      uptime: 0,
      lastLogTime: null
    }
  }
}

export default async function SettingsPage() {
  const [systemLogs, logStats, fileLogs, systemStats] = await Promise.all([
    getSystemLogs(100),
    getLogStats(),
    getFileLogs(),
    getSystemStats(),
  ])
  
  return (
    <SettingsPageClient
      systemLogs={systemLogs}
      logStats={logStats}
      fileLogs={fileLogs}
      systemStats={systemStats}
    />
  )
}
