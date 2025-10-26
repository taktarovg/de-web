'use client'

// Placeholder компоненты - будут реализованы позже

export function EmotionChart() {
  return (
    <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
      <p className="text-slate-500">График топ эмоций (в разработке)</p>
    </div>
  )
}

export function UsersTable({ users }: { users: any[] }) {
  return (
    <div className="p-6">
      <p className="text-slate-500">Таблица пользователей: {users.length} записей</p>
      <p className="text-sm text-slate-400 mt-2">Компонент в разработке</p>
    </div>
  )
}

export function EmotionsTable({ emotions }: { emotions: any[] }) {
  return (
    <div className="p-6">
      <p className="text-slate-500">Таблица эмоций: {emotions.length} записей</p>
      <p className="text-sm text-slate-400 mt-2">Компонент в разработке</p>
    </div>
  )
}

export function CourseProgressTable({ progress }: { progress: any[] }) {
  return (
    <div className="p-6">
      <p className="text-slate-500">Прогресс курса: {progress.length} студентов</p>
      <p className="text-sm text-slate-400 mt-2">Компонент в разработке</p>
    </div>
  )
}

export function AnalyticsCharts({ data }: { data: any }) {
  return (
    <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
      <p className="text-slate-500">График активности по дням (в разработке)</p>
    </div>
  )
}

export function EmotionLevelChart() {
  return (
    <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
      <p className="text-slate-500">Распределение по шкале Хокинса (в разработке)</p>
    </div>
  )
}
