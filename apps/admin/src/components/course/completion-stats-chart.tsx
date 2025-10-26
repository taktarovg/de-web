'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

interface CompletionStatsChartProps {
  data: Array<{
    range: string
    count: number
  }>
}

const COLORS = ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444', '#3b82f6']

export function CompletionStatsChart({ data }: CompletionStatsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ range, count }) => `${range}: ${count}`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="count"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
