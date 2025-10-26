'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface ChartDataPoint {
  date: string
  avg_level: number
  count: number
}

interface EmotionTrendChartProps {
  chartData: ChartDataPoint[]
}

export function EmotionTrendChart({ chartData }: EmotionTrendChartProps) {
  const formattedData = chartData.map(d => ({
    ...d,
    dateLabel: format(new Date(d.date), 'd MMM', { locale: ru }),
    fullDate: format(new Date(d.date), 'd MMMM yyyy', { locale: ru }),
  }))

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        📈 Динамика эмоционального состояния (30 дней)
      </h3>
      <div className="h-[300px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData}>
              <defs>
                <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="dateLabel" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <YAxis 
                domain={[0, 1000]} 
                ticks={[0, 200, 400, 600, 800, 1000]}
                tick={{ fontSize: 12, fill: '#64748b' }}
                stroke="#cbd5e1"
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                        <p className="text-sm font-medium text-slate-900 mb-1">{data.fullDate}</p>
                        <p className="text-sm text-slate-600">Уровень: {Math.round(data.avg_level)}</p>
                        <p className="text-sm text-slate-600">Анализов: {data.count}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="avg_level"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#colorLevel)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            Нет данных для отображения
          </div>
        )}
      </div>
    </div>
  )
}
