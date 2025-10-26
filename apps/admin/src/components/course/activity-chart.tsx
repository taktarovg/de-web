'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

interface ActivityChartProps {
  data: Array<{
    date: string
    activeStudents: number
  }>
}

export function ActivityChart({ data }: ActivityChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    dateFormatted: format(parseISO(item.date), 'dd MMM', { locale: ru }),
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="dateFormatted"
          stroke="#64748b"
          fontSize={12}
        />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
          }}
          labelFormatter={(label) => `Дата: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="activeStudents"
          stroke="#6366f1"
          strokeWidth={3}
          name="Активных студентов"
          dot={{ fill: '#6366f1', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
