'use client'

import * as React from 'react'
import Link from 'next/link'
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
  User as UserIcon,
  Calendar,
  Activity,
  Flame
} from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

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

interface User {
  id: string
  telegramId: string
  username: string | null
  firstName: string | null
  totalCheckins: number
  currentStreak: number
  isProgramActive: boolean
  createdAt: Date
  lastCheckinDate: Date | null
}

interface UsersTableProps {
  data: User[]
}

export function UsersTable({ data }: UsersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'createdAt', desc: true }
  ])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'telegramId',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-slate-100"
          >
            <UserIcon className="mr-2 h-4 w-4" />
            Telegram ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const telegramId = row.getValue('telegramId') as string
        return (
          <div className="font-mono text-sm text-slate-600">
            {telegramId}
          </div>
        )
      },
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-slate-100"
          >
            Имя
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const firstName = row.getValue('firstName') as string | null
        const username = row.original.username
        return (
          <div>
            <div className="font-medium text-slate-900">
              {firstName || 'Без имени'}
            </div>
            {username && (
              <div className="text-xs text-slate-500">
                @{username}
              </div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'totalCheckins',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-slate-100"
          >
            <Activity className="mr-2 h-4 w-4" />
            Анализов
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const total = row.getValue('totalCheckins') as number
        return (
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
              {total}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'currentStreak',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-slate-100"
          >
            <Flame className="mr-2 h-4 w-4" />
            Стрик
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const streak = row.getValue('currentStreak') as number
        return (
          <div className="text-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              streak >= 7 
                ? 'bg-orange-100 text-orange-700' 
                : streak >= 3 
                ? 'bg-yellow-100 text-yellow-700' 
                : 'bg-slate-100 text-slate-700'
            }`}>
              🔥 {streak}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'isProgramActive',
      header: 'Статус',
      cell: ({ row }) => {
        const isActive = row.getValue('isProgramActive') as boolean
        return (
          <Badge variant={isActive ? 'success' : 'secondary'}>
            {isActive ? 'Активен' : 'Неактивен'}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'lastCheckinDate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-slate-100"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Последний анализ
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = row.getValue('lastCheckinDate') as Date | null
        if (!date) return <span className="text-slate-400">Нет данных</span>
        
        return (
          <div className="text-sm">
            <div className="text-slate-900">
              {format(new Date(date), 'd MMMM yyyy', { locale: ru })}
            </div>
            <div className="text-xs text-slate-500">
              {format(new Date(date), 'HH:mm')}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-slate-100"
          >
            Регистрация
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = row.getValue('createdAt') as Date
        return (
          <div className="text-sm text-slate-600">
            {format(new Date(date), 'd MMM yyyy', { locale: ru })}
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
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
        pageSize: 10,
      },
    },
  })

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Поиск по имени, username или Telegram ID..."
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium">{table.getFilteredRowModel().rows.length}</span>
          <span>из {data.length} пользователей</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => {
                    window.location.href = `/dream/users/${row.original.telegramId}`
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                    <UserIcon className="h-8 w-8 mb-2 opacity-50" />
                    <p>Пользователи не найдены</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
