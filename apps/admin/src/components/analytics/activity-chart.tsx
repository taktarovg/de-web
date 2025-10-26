'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { format, parseISO } from 'date-fns'

interface ActivityChartProps {
  data: Array<{
    date: string
    count: number
    avgLevel: number
  }>
}

export function ActivityChart({ data }: ActivityChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    dateFormatted: format(parseISO(item.date), 'dd.MM'),
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
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
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#6366f1"
          strokeWidth={2}
          name="Количество анализов"
          dot={{ fill: '#6366f1', r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="avgLevel"
          stroke="#22c55e"
          strokeWidth={2}
          name="Средний уровень"
          dot={{ fill: '#22c55e', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
