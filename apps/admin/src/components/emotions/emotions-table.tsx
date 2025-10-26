'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Heart,
  TrendingUp,
  Eye,
  EyeOff,
  Pencil,
  Trash2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Emotion {
  id: string
  name: string
  emoji: string
  category: string
  level: number
  isActive: boolean
  _count: {
    analyses: number
  }
}

interface Category {
  id: string
  name: string
  levelMin: number
  levelMax: number
  emoji: string
  description: string
  colorHex: string
  sortOrder: number
}

interface EmotionsTableProps {
  data: Emotion[]
  categories: Category[]
  onEdit?: (emotion: Emotion) => void
  onDelete?: (emotionId: string) => void
}

// Цвета для категорий (по шкале Хокинса)
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'апатия': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' },
  'печаль': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  'страх': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  'вожделение': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  'злость': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
  'гордыня': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  'мужество': { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300' },
  'принятие': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  'умиротворение': { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-300' },
}

export function EmotionsTable({ data, categories, onEdit, onDelete }: EmotionsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'level', desc: false }
  ])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

  // Фильтрация по категории
  const filteredData = React.useMemo(() => {
    if (!selectedCategory) return data
    return data.filter(emotion => emotion.category === selectedCategory)
  }, [data, selectedCategory])

  const columns: ColumnDef<Emotion>[] = [
    {
      accessorKey: 'emoji',
      header: '',
      cell: ({ row }) => {
        const emoji = row.getValue('emoji') as string
        return (
          <div className="text-2xl">
            {emoji}
          </div>
        )
      },
      enableSorting: false,
      size: 60,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-slate-100"
          >
            Эмоция
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const name = row.getValue('name') as string
        const isActive = row.original.isActive
        return (
          <div className="flex items-center gap-2">
            <span className={`font-medium ${!isActive ? 'text-slate-400' : 'text-slate-900'}`}>
              {name}
            </span>
            {!isActive && (
              <EyeOff className="h-3 w-3 text-slate-400" />
            )}
          </div>
        )
      },
      size: 150,
    },
    {
      accessorKey: 'category',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-slate-100"
          >
            Категория
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const category = row.getValue('category') as string
        const categoryData = categories.find(c => c.name === category)
        const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS['апатия']
        
        return (
          <div className="flex items-center gap-2">
            <span className="text-lg">{categoryData?.emoji}</span>
            <Badge 
              className={`${colors.bg} ${colors.text} border ${colors.border} capitalize`}
              variant="outline"
            >
              {category}
            </Badge>
          </div>
        )
      },
      size: 150,
    },
    {
      accessorKey: 'level',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-slate-100"
          >
            Уровень
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const level = row.getValue('level') as number
        
        // Цвет в зависимости от уровня
        let colorClass = 'text-slate-600'
        if (level >= 500) colorClass = 'text-teal-600 font-semibold'
        else if (level >= 350) colorClass = 'text-green-600 font-semibold'
        else if (level >= 200) colorClass = 'text-indigo-600 font-medium'
        else if (level >= 150) colorClass = 'text-purple-600'
        else if (level >= 100) colorClass = 'text-yellow-600'
        else if (level >= 75) colorClass = 'text-blue-600'
        else colorClass = 'text-slate-500'
        
        return (
          <div className="text-center">
            <span className={`text-lg ${colorClass}`}>
              {level}
            </span>
          </div>
        )
      },
      size: 100,
    },
    {
      accessorKey: '_count.analyses',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-slate-100"
          >
            <Heart className="mr-2 h-4 w-4" />
            Использ.
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const count = row.original._count.analyses
        return (
          <div className="text-center">
            <span className={`inline-flex items-center justify-center min-w-[40px] h-8 px-3 rounded-full text-sm font-medium ${
              count >= 10 
                ? 'bg-indigo-100 text-indigo-700' 
                : count >= 5 
                ? 'bg-slate-100 text-slate-700' 
                : 'bg-slate-50 text-slate-500'
            }`}>
              {count}
            </span>
          </div>
        )
      },
      size: 120,
    },
    {
      accessorKey: 'isActive',
      header: 'Статус',
      cell: ({ row }) => {
        const isActive = row.getValue('isActive') as boolean
        return (
          <div className="flex items-center gap-2 whitespace-nowrap">
            {isActive ? (
              <Badge className="bg-green-100 text-green-700 border-green-300">Активна</Badge>
            ) : (
              <Badge variant="secondary">Скрыта</Badge>
            )}
          </div>
        )
      },
      size: 100,
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => {
        const emotion = row.original
        return (
          <div className="flex items-center gap-1 whitespace-nowrap">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(emotion)}
                className="h-8 w-8 p-0 hover:bg-indigo-50"
                title="Редактировать"
              >
                <Pencil className="h-4 w-4 text-indigo-600" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm(`Удалить эмоцию "${emotion.name}"?`)) {
                    onDelete(emotion.id)
                  }
                }}
                className="h-8 w-8 p-0 hover:bg-red-50"
                title="Удалить"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            )}
          </div>
        )
      },
      enableSorting: false,
      size: 100,
    },
  ]

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  })

  return (
    <div className="space-y-4">
      {/* Фильтр по категориям */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          Все ({data.length})
        </Button>
        {categories.map((category) => {
          const count = data.filter(e => e.category === category.name).length
          const colors = CATEGORY_COLORS[category.name] || CATEGORY_COLORS['апатия']
          
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className={selectedCategory === category.name ? '' : `${colors.bg} ${colors.text} hover:${colors.bg}`}
            >
              <span className="mr-1">{category.emoji}</span>
              {category.name} ({count})
            </Button>
          )
        })}
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Поиск эмоций..."
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium">{table.getFilteredRowModel().rows.length}</span>
          <span>из {filteredData.length} эмоций</span>
        </div>
      </div>

      {/* Table with horizontal scroll */}
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-slate-50">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <Heart className="h-8 w-8 mb-2 opacity-50" />
                      <p>Эмоции не найдены</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Страница {table.getState().pagination.pageIndex + 1} из{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Назад
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Вперёд
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
