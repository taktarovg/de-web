'use client'

import { useState } from 'react'
import { 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Database,
  Server,
  RefreshCw,
  Filter,
  Clock,
  FileText,
  TrendingUp,
  Info
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

interface SystemLog {
  id: string
  level: string
  message: string
  context: any
  timestamp: Date
}

interface LogStats {
  totalLogs: number
  errorsToday: number
  warningsToday: number
  logsByLevel: Array<{ level: string; count: number }>
}

interface SettingsPageClientProps {
  systemLogs: SystemLog[]
  logStats: LogStats
  fileLogs: {
    errorLogs: string[]
    combinedLogs: string[]
    available: boolean
    path?: string
    message?: string
  }
  systemStats: {
    totalUsers: number
    totalAnalyses: number
    activeUsersToday: number
    botStatus: string
    version: string
    uptime: number
    lastLogTime: Date | null
  }
}

export function SettingsPageClient({
  systemLogs,
  logStats,
  fileLogs,
  systemStats,
}: SettingsPageClientProps) {
  const [activeTab, setActiveTab] = useState<'database' | 'file-errors' | 'file-combined' | 'stats'>('database')
  const [filterLevel, setFilterLevel] = useState<'all' | 'error' | 'info' | 'warning'>('all')
  
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}д ${hours}ч ${minutes}м`
  }

  const getLogLevelColor = (level: string) => {
    const lowerLevel = level.toLowerCase()
    if (lowerLevel === 'error') return 'text-red-600 bg-red-50 border-red-200'
    if (lowerLevel === 'warning' || lowerLevel === 'warn') return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    if (lowerLevel === 'info') return 'text-blue-600 bg-blue-50 border-blue-200'
    if (lowerLevel === 'debug') return 'text-gray-600 bg-gray-50 border-gray-200'
    return 'text-slate-600 bg-slate-50 border-slate-200'
  }

  const parseFileLog = (logLine: string) => {
    // Parse: "2025-10-15 12:34:56 [ERROR]: message"
    const match = logLine.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\]: (.+)$/)
    if (match) {
      return {
        timestamp: match[1],
        level: match[2],
        message: match[3]
      }
    }
    return null
  }

  const filteredSystemLogs = systemLogs.filter(log => {
    if (filterLevel === 'all') return true
    return log.level.toLowerCase() === filterLevel
  })

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Настройки и мониторинг</h1>
        <p className="text-slate-600 mt-1">
          Системные логи, статус бота и настройки
        </p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Статус бота</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-3 h-3 rounded-full ${
                  systemStats.botStatus === 'online' ? 'bg-green-500 animate-pulse' : 
                  systemStats.botStatus === 'inactive' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <p className="text-xl font-bold text-slate-900 capitalize">
                  {systemStats.botStatus === 'online' ? 'Онлайн' : 
                   systemStats.botStatus === 'inactive' ? 'Неактивен' : 'Неизвестно'}
                </p>
              </div>
            </div>
            <Server className="w-10 h-10 text-indigo-500" />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {systemStats.lastLogTime ? (
              `Последний лог: ${formatDistanceToNow(new Date(systemStats.lastLogTime), { addSuffix: true, locale: ru })}`
            ) : 'Нет данных'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Активных сегодня</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {systemStats.activeUsersToday}
              </p>
            </div>
            <Activity className="w-10 h-10 text-green-500" />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Из {systemStats.totalUsers} пользователей
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Ошибок за 24ч</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {logStats.errorsToday}
              </p>
            </div>
            <AlertCircle className={`w-10 h-10 ${
              logStats.errorsToday > 0 ? 'text-red-500' : 'text-gray-300'
            }`} />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {logStats.warningsToday > 0 && `${logStats.warningsToday} предупреждений`}
            {logStats.errorsToday === 0 && logStats.warningsToday === 0 && 'Всё в порядке ✓'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Всего логов</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {logStats.totalLogs}
              </p>
            </div>
            <FileText className="w-10 h-10 text-blue-500" />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            В базе данных
          </p>
        </div>
      </div>

      {/* File Logs Status Banner */}
      {!fileLogs.available && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Режим работы: БД
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Файловые логи недоступны. Бот работает на сервере и пишет логи напрямую в базу данных. 
                Это нормально для production окружения.
              </p>
            </div>
          </div>
        </div>
      )}

      {fileLogs.available && fileLogs.path && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">
                Режим работы: Локальный
              </p>
              <p className="text-sm text-green-700 mt-1">
                Файловые логи доступны: <code className="bg-green-100 px-1 py-0.5 rounded text-xs">{fileLogs.path}</code>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Logs Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex gap-4 p-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('database')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'database'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Логи БД ({systemLogs.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'stats'
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Статистика
              </div>
            </button>
            {fileLogs.available && (
              <>
                <button
                  onClick={() => setActiveTab('file-errors')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'file-errors'
                      ? 'bg-red-50 text-red-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Error.log ({fileLogs.errorLogs.length})
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('file-combined')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'file-combined'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Combined.log ({fileLogs.combinedLogs.length})
                  </div>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Toolbar */}
        {activeTab !== 'stats' && (
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value as any)}
                className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Все логи</option>
                <option value="error">Только ошибки</option>
                <option value="warning">Только предупреждения</option>
                <option value="info">Только инфо</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Обновить
              </button>
            </div>
          </div>
        )}

        {/* Logs Content */}
        <div className="p-4">
          {activeTab === 'database' && (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredSystemLogs.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Database className="w-16 h-16 mx-auto mb-3 opacity-20" />
                  <p className="text-lg font-medium">Логов не найдено</p>
                  <p className="text-sm mt-1">
                    {filterLevel === 'all' 
                      ? 'Когда бот начнёт работать, здесь появятся логи'
                      : `Нет логов уровня "${filterLevel}"`}
                  </p>
                </div>
              ) : (
                filteredSystemLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`border rounded-lg p-4 hover:shadow-sm transition-shadow ${getLogLevelColor(log.level)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
                        log.level.toLowerCase() === 'error' ? 'bg-red-100 text-red-700' :
                        log.level.toLowerCase() === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {log.level}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {format(new Date(log.timestamp), 'dd.MM.yyyy HH:mm:ss')}
                      </span>
                    </div>
                    <p className="text-sm text-slate-900 mb-2 font-medium">{log.message}</p>
                    {log.context && Object.keys(log.context).length > 0 && (
                      <details className="text-xs mt-2">
                        <summary className="cursor-pointer text-slate-600 hover:text-slate-900 font-medium">
                          Подробности →
                        </summary>
                        <pre className="mt-2 p-3 bg-slate-100 rounded text-xs overflow-x-auto">
                          {JSON.stringify(log.context, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Статистика логирования за 7 дней</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {logStats.logsByLevel.map((item) => (
                    <div key={item.level} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium capitalize ${
                          item.level === 'error' ? 'text-red-600' :
                          item.level === 'warning' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`}>
                          {item.level}
                        </span>
                        <span className="text-2xl font-bold text-slate-900">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Информация о системе</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <dt className="text-sm text-slate-600">Версия бота</dt>
                    <dd className="text-lg font-semibold text-slate-900 mt-1">{systemStats.version}</dd>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <dt className="text-sm text-slate-600">Аптайм админки</dt>
                    <dd className="text-lg font-semibold text-slate-900 mt-1">{formatUptime(systemStats.uptime)}</dd>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <dt className="text-sm text-slate-600">Всего пользователей</dt>
                    <dd className="text-lg font-semibold text-slate-900 mt-1">{systemStats.totalUsers}</dd>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <dt className="text-sm text-slate-600">Всего анализов</dt>
                    <dd className="text-lg font-semibold text-slate-900 mt-1">{systemStats.totalAnalyses}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'file-errors' && fileLogs.available && (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {fileLogs.errorLogs.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <CheckCircle className="w-16 h-16 mx-auto mb-3 text-green-500 opacity-20" />
                  <p className="text-lg font-medium">Ошибок не найдено</p>
                  <p className="text-sm mt-1 text-green-600">Всё работает отлично! ✓</p>
                </div>
              ) : (
                fileLogs.errorLogs.map((line, idx) => {
                  const parsed = parseFileLog(line)
                  if (!parsed) {
                    return (
                      <div key={idx} className="text-xs text-slate-500 font-mono p-2 border-l-2 border-slate-200 bg-slate-50">
                        {line}
                      </div>
                    )
                  }
                  return (
                    <div
                      key={idx}
                      className="border border-red-200 bg-red-50 rounded-lg p-3 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="px-2 py-1 rounded text-xs font-semibold text-red-700 bg-red-100">
                          {parsed.level}
                        </span>
                        <span className="text-xs text-red-600 font-mono">
                          {parsed.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-slate-900 font-mono leading-relaxed break-all">{parsed.message}</p>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {activeTab === 'file-combined' && fileLogs.available && (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {fileLogs.combinedLogs.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Activity className="w-16 h-16 mx-auto mb-3 opacity-20" />
                  <p className="text-lg font-medium">Логов не найдено</p>
                  <p className="text-sm mt-1">Файл combined.log пуст</p>
                </div>
              ) : (
                fileLogs.combinedLogs.map((line, idx) => {
                  const parsed = parseFileLog(line)
                  if (!parsed) {
                    return (
                      <div key={idx} className="text-xs text-slate-500 font-mono p-2 border-l-2 border-slate-200">
                        {line}
                      </div>
                    )
                  }
                  const isError = parsed.level === 'ERROR'
                  return (
                    <div
                      key={idx}
                      className={`border rounded-lg p-3 hover:shadow-sm transition-shadow ${
                        isError 
                          ? 'border-red-200 bg-red-50' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          isError 
                            ? 'text-red-700 bg-red-100' 
                            : 'text-blue-700 bg-blue-100'
                        }`}>
                          {parsed.level}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          {parsed.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-slate-900 font-mono leading-relaxed break-all">{parsed.message}</p>
                    </div>
                  )
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
