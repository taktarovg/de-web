import { prisma } from '@designemotion/database'
import { Button } from '@/components/ui/button'
import { Plus, Users as UsersIcon } from 'lucide-react'
import { UsersTable } from '@/components/users/users-table'

async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      telegramId: true,
      username: true,
      firstName: true,
      totalCheckins: true,
      currentStreak: true,
      isProgramActive: true,
      createdAt: true,
      lastCheckinDate: true,
    },
  })
  // Convert bigint telegramId to string
  return users.map(user => ({
    ...user,
    telegramId: user.telegramId.toString(),
    username: user.username || '',
    firstName: user.firstName || '',
  }))
}

async function getUserStats() {
  const [total, active, withAnalyses] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isProgramActive: true } }),
    prisma.user.count({ where: { totalCheckins: { gt: 0 } } }),
  ])
  
  return { total, active, withAnalyses }
}

export default async function UsersPage() {
  const [users, stats] = await Promise.all([
    getUsers(),
    getUserStats(),
  ])

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Пользователи</h1>
          <p className="text-slate-600 mt-1">
            Управление пользователями бота
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить пользователя
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Всего пользователей</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
            </div>
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Активных</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.active}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {((stats.active / stats.total) * 100).toFixed(1)}% от общего числа
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">С анализами</p>
              <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.withAnalyses}</p>
            </div>
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {((stats.withAnalyses / stats.total) * 100).toFixed(1)}% начали работу
          </p>
        </div>
      </div>

      {/* Users Table */}
      <UsersTable data={users} />
    </div>
  )
}
