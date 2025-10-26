'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface CategoryData {
  category: string
  category_name: string
  category_emoji: string
  count: number
  avg_level: number
  percentage: number
}

interface EmotionDistributionChartProps {
  categoryDistribution: CategoryData[]
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#64748b', '#94a3b8']

export function EmotionDistributionChart({ categoryDistribution }: EmotionDistributionChartProps) {
  const sortedData = [...categoryDistribution].sort((a, b) => b.count - a.count)
  
  const chartData = sortedData.map(d => ({
    name: `${d.category_emoji} ${d.category_name}`,
    value: d.count,
    percentage: d.percentage,
    avg_level: d.avg_level,
  }))

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        🎭 Распределение по категориям эмоций
      </h3>
      <div className="h-[300px]">
        {categoryDistribution.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ percentage }) => `${percentage.toFixed(1)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                        <p className="text-sm font-medium text-slate-900 mb-1">{data.name}</p>
                        <p className="text-sm text-slate-600">Анализов: {data.value}</p>
                        <p className="text-sm text-slate-600">Процент: {data.percentage.toFixed(1)}%</p>
                        <p className="text-sm text-slate-600">Средний уровень: {Math.round(data.avg_level)}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
            </PieChart>
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
