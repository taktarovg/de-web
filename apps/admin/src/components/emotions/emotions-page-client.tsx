'use client'

import * as React from 'react'
import { Plus, Heart, TrendingUp, Eye } from 'lucide-react'
import { EmotionsTable } from '@/components/emotions/emotions-table'
import { EmotionDialog } from '@/components/emotions/emotion-dialog'

interface Emotion {
  id: string
  name: string
  emoji: string
  category: string
  level: number
  description?: string | null
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

interface EmotionStats {
  total: number
  active: number
  totalUsage: number
  mostUsedEmotion: {
    name: string
    emoji: string
    _count: {
      analyses: number
    }
  } | null
}

interface EmotionsPageClientProps {
  initialEmotions: Emotion[]
  categories: Category[]
  stats: EmotionStats
}

export function EmotionsPageClient({ initialEmotions, categories, stats }: EmotionsPageClientProps) {
  const [emotions, setEmotions] = React.useState(initialEmotions)
  const [selectedEmotion, setSelectedEmotion] = React.useState<Emotion | null>(null)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const handleSave = async (emotionData: Partial<Emotion>) => {
    try {
      const method = emotionData.id ? 'PUT' : 'POST'
      const url = emotionData.id 
        ? `/api/emotions/${emotionData.id}`
        : '/api/emotions'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emotionData),
      })

      if (!response.ok) {
        throw new Error('Failed to save emotion')
      }

      const savedEmotion = await response.json()

      if (emotionData.id) {
        // Update existing
        setEmotions(emotions.map(e => 
          e.id === savedEmotion.id ? { ...e, ...savedEmotion } : e
        ))
      } else {
        // Add new
        setEmotions([...emotions, { ...savedEmotion, _count: { analyses: 0 } }])
      }

      setSelectedEmotion(null)
      setIsDialogOpen(false)

      // Reload page to update stats
      window.location.reload()
    } catch (error) {
      console.error('Error saving emotion:', error)
      throw error
    }
  }

  const handleEdit = (emotion: Emotion) => {
    setSelectedEmotion(emotion)
    setIsDialogOpen(true)
  }

  const handleDelete = async (emotionId: string) => {
    try {
      const response = await fetch(`/api/emotions/${emotionId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete emotion')
      }

      setEmotions(emotions.filter(e => e.id !== emotionId))
    } catch (error) {
      console.error('Error deleting emotion:', error)
      alert('Ошибка при удалении эмоции')
    }
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">108 Эмоций</h1>
          <p className="text-slate-600 mt-1">
            Управление каталогом эмоций ({stats.total} эмоций в {categories.length} категориях)
          </p>
        </div>
        <EmotionDialog
          categories={categories}
          onSave={handleSave}
          trigger={
            <button className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Добавить эмоцию
            </button>
          }
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Всего эмоций</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
            </div>
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Активных</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.active}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {((stats.active / stats.total) * 100).toFixed(1)}% от общего числа
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Всего анализов</p>
              <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalUsage}</p>
            </div>
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div>
            <p className="text-sm font-medium text-slate-600">Популярная эмоция</p>
            {stats.mostUsedEmotion ? (
              <>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl">{stats.mostUsedEmotion.emoji}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{stats.mostUsedEmotion.name}</p>
                    <p className="text-xs text-slate-500">
                      {stats.mostUsedEmotion._count.analyses} использований
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-slate-400 mt-2">Нет данных</p>
            )}
          </div>
        </div>
      </div>

      {/* Emotions Table */}
      <EmotionsTable 
        data={emotions} 
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Edit Dialog */}
      {selectedEmotion && (
        <EmotionDialog
          emotion={selectedEmotion}
          categories={categories}
          onSave={handleSave}
          trigger={null}
        />
      )}
    </div>
  )
}
