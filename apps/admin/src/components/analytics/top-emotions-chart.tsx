'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface TopEmotionsChartProps {
  data: Array<{
    name: string
    emoji: string
    category: string
    count: number
  }>
}

export function TopEmotionsChart({ data }: TopEmotionsChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    displayName: `${item.emoji} ${item.name}`,
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={formattedData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis type="number" stroke="#64748b" fontSize={12} />
        <YAxis
          type="category"
          dataKey="displayName"
          stroke="#64748b"
          fontSize={12}
          width={140}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Bar
          dataKey="count"
          fill="#6366f1"
          name="Количество"
          radius={[0, 8, 8, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
