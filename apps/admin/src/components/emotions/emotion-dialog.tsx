'use client'

import * as React from 'react'
import { Pencil, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Emotion {
  id: string
  name: string
  emoji: string
  category: string
  level: number
  description?: string | null
  isActive: boolean 
}

interface Category {
  id: string
  name: string
  levelMin: number
  levelMax: number
  emoji: string
  description?: string | null
  colorHex?: string | null
  sortOrder?: number | null
}

interface EmotionDialogProps {
  emotion?: Emotion | null
  categories: Category[]
  onSave: (emotion: Partial<Emotion>) => Promise<void>
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function EmotionDialog({ emotion, categories, onSave, trigger, open: controlledOpen, onOpenChange }: EmotionDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen
  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState<Partial<Emotion>>({
    name: '',
    emoji: '',
    category: categories[0]?.name || '',
    level: 50,
    description: '',
    isActive: true,
  })

  // Reset form when dialog opens
  React.useEffect(() => {
    if (open) {
      if (emotion) {
        setFormData({
          id: emotion.id,
          name: emotion.name,
          emoji: emotion.emoji,
          category: emotion.category,
          level: emotion.level,
          description: emotion.description || '',
          isActive: emotion.isActive,
        })
      } else {
        setFormData({
          name: '',
          emoji: '',
          category: categories[0]?.name || '',
          level: 50,
          description: '',
          isActive: true,
        })
      }
    }
  }, [open, emotion, categories])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await onSave(formData)
      setOpen(false)
    } catch (error) {
      console.error('Failed to save emotion:', error)
      alert('Ошибка при сохранении эмоции')
    } finally {
      setLoading(false)
    }
  }

  const selectedCategory = categories.find(c => c.name === formData.category)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Добавить эмоцию
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {emotion ? 'Редактировать эмоцию' : 'Добавить эмоцию'}
            </DialogTitle>
            <DialogDescription>
              {emotion 
                ? 'Измените параметры эмоции' 
                : 'Заполните форму для создания новой эмоции'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Название и Emoji */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Название эмоции <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Например: Радостный"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emoji">
                  Emoji <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="emoji"
                  value={formData.emoji}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                  placeholder="😊"
                  required
                  className="text-2xl text-center"
                />
              </div>
            </div>

            {/* Категория */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Категория <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => {
                  const cat = categories.find(c => c.name === value)
                  setFormData({ 
                    ...formData, 
                    category: value,
                    level: cat ? Math.floor((cat.levelMin + cat.levelMax) / 2) : 50
                  })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="capitalize">{cat.name}</span>
                        <span className="text-xs text-slate-500">
                          ({cat.levelMin}-{cat.levelMax})
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Уровень Хокинса */}
            <div className="space-y-2">
              <Label htmlFor="level">
                Уровень Хокинса: <span className="font-bold text-indigo-600">{formData.level}</span>
                {selectedCategory && (
                  <span className="text-xs text-slate-500 ml-2">
                    (диапазон: {selectedCategory.levelMin}-{selectedCategory.levelMax})
                  </span>
                )}
              </Label>
              <input
                id="level"
                type="range"
                min={selectedCategory?.levelMin || 20}
                max={selectedCategory?.levelMax || 1000}
                step="5"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>{selectedCategory?.levelMin}</span>
                <span>{selectedCategory?.levelMax}</span>
              </div>
            </div>

            {/* Описание */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Дополнительное описание
                <span className="text-xs text-slate-500 font-normal ml-2">
                  (показывается пользователю после анализа)
                </span>
              </Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Опишите эмоцию, что она означает..."
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-slate-500">
                💡 Например: "Состояние радости и удовлетворения от происходящего. Энергия на уровне {formData.level} означает..."
              </p>
            </div>

            {/* Статус активности */}
            <div className="flex items-center justify-between space-x-2 rounded-lg border border-slate-200 p-4">
              <div className="space-y-0.5">
                <Label htmlFor="isActive" className="text-base">
                  Активна
                </Label>
                <p className="text-sm text-slate-500">
                  Эмоция будет доступна пользователям в боте
                </p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Сохранение...' : emotion ? 'Сохранить' : 'Создать'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
