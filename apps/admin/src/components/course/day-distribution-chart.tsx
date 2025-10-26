'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

interface DayDistributionChartProps {
  data: Array<{
    day: number
    students: number
  }>
}

export function DayDistributionChart({ data }: DayDistributionChartProps) {
  // Цветовая градация: зелёный для начала, жёлтый для середины, синий для конца
  const getColor = (day: number) => {
    if (day <= 10) return '#22c55e' // green
    if (day <= 20) return '#eab308' // yellow
    return '#3b82f6' // blue
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="day" 
          stroke="#64748b" 
          fontSize={12}
          label={{ value: 'День курса', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          stroke="#64748b" 
          fontSize={12}
          label={{ value: 'Студентов', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
          }}
          formatter={(value) => [`${value} студентов`, 'Количество']}
          labelFormatter={(label) => `День ${label}`}
        />
        <Bar dataKey="students" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.day)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
