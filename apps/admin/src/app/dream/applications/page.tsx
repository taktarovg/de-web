import { prisma } from '@ecosystem/database'
import { ApplicationsTable } from '@/components/applications/applications-table'
import { Badge } from '@/components/ui/badge'
import { FileText, Clock, CheckCircle2, XCircle } from 'lucide-react'

export const revalidate = 0

async function getApplicationsStats() {
  try {
    const [total, newCount, contactedCount, completedCount] = await Promise.all([
      prisma.application.count(),
      prisma.application.count({ where: { status: 'new' } }),
      prisma.application.count({ where: { status: 'contacted' } }),
      prisma.application.count({ where: { status: 'completed' } }),
    ])

    return { total, newCount, contactedCount, completedCount, error: null }
  } catch (error) {
    console.error('Error fetching applications stats:', error)
    return { total: 0, newCount: 0, contactedCount: 0, completedCount: 0, error: 'Ошибка подключения к БД' }
  }
}

async function getApplications() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    return { applications, error: null }
  } catch (error) {
    console.error('Error fetching applications:', error)
    return { applications: [], error: 'Ошибка загрузки заявок' }
  }
}

export default async function ApplicationsPage() {
  const stats = await getApplicationsStats()
  const { applications, error } = await getApplications()

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Заявки с сайта</h1>
        <p className="text-slate-600 mt-1">Управление заявками с designemotion.ru</p>
      </div>

      {/* Error Alert */}
      {(stats.error || error) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            ⚠️ {stats.error || error}
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Всего заявок</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Новые</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{stats.newCount}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Связались</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{stats.contactedCount}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Завершено</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{stats.completedCount}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Список заявок</h2>
        </div>
        
        <ApplicationsTable applications={applications} />
      </div>
    </div>
  )
}
