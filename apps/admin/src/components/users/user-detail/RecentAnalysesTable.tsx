'use client'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Analysis {
  id: string
  emotion_id: string
  emotion_name: string
  emotion_emoji: string
  emotion_level: number
  category_name: string
  category_emoji: string
  created_at: string
}

interface RecentAnalysesTableProps {
  analyses: Analysis[]
}

function getEmotionLevelColor(level: number) {
  if (level >= 500) return 'bg-green-100 text-green-700'
  if (level >= 350) return 'bg-emerald-100 text-emerald-700'
  if (level >= 200) return 'bg-blue-100 text-blue-700'
  if (level >= 100) return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}

function getEmotionLevelLabel(level: number) {
  if (level >= 700) return 'Просветление'
  if (level >= 600) return 'Умиротворение'
  if (level >= 500) return 'Любовь'
  if (level >= 350) return 'Принятие'
  if (level >= 200) return 'Мужество'
  if (level >= 150) return 'Злость'
  if (level >= 100) return 'Страх'
  if (level >= 75) return 'Печаль'
  return 'Апатия'
}

export function RecentAnalysesTable({ analyses }: RecentAnalysesTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">
          📋 Последние 20 анализов
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[200px]">Дата и время</TableHead>
              <TableHead>Эмоция</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead className="text-center">Уровень</TableHead>
              <TableHead>Диапазон</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analyses.length > 0 ? (
              analyses.map((analysis) => (
                <TableRow key={analysis.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">
                        {format(new Date(analysis.created_at), 'd MMMM yyyy', { locale: ru })}
                      </div>
                      <div className="text-sm text-slate-500">
                        {format(new Date(analysis.created_at), 'HH:mm:ss')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{analysis.emotion_emoji}</span>
                      <span className="font-medium text-slate-900">{analysis.emotion_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{analysis.category_emoji}</span>
                      <span className="text-slate-700">{analysis.category_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-flex items-center justify-center w-16 h-8 rounded-full font-semibold text-sm ${getEmotionLevelColor(analysis.emotion_level)}`}>
                      {analysis.emotion_level}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getEmotionLevelLabel(analysis.emotion_level)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                  Анализы не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
