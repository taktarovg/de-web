'use client'

import * as React from 'react'
import { Pencil, Plus } from 'lucide-react'
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

interface CategoryDialogProps {
  category?: Category | null
  onSave: (category: Partial<Category>) => Promise<void>
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CategoryDialog({ 
  category, 
  onSave, 
  trigger, 
  open: controlledOpen, 
  onOpenChange 
}: CategoryDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen
  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState<Partial<Category>>({
    name: '',
    emoji: '',
    levelMin: 20,
    levelMax: 100,
    description: '',
    colorHex: '#000000',
  })

  // Reset form when dialog opens
  React.useEffect(() => {
    if (open) {
      if (category) {
        setFormData({
          id: category.id,
          name: category.name,
          emoji: category.emoji,
          levelMin: category.levelMin,
          levelMax: category.levelMax,
          description: category.description || '',
          colorHex: category.colorHex || '#000000',
        })
      } else {
        setFormData({
          name: '',
          emoji: '',
          levelMin: 20,
          levelMax: 100,
          description: '',
          colorHex: '#000000',
        })
      }
    }
  }, [open, category])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await onSave(formData)
      setOpen(false)
    } catch (error) {
      console.error('Failed to save category:', error)
      alert('Ошибка при сохранении категории')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Добавить категорию
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {category ? 'Редактировать категорию' : 'Добавить категорию'}
            </DialogTitle>
            <DialogDescription>
              {category 
                ? 'Измените параметры категории эмоций' 
                : 'Заполните форму для создания новой категории'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Название и Emoji */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cat-name">
                  Название <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cat-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Например: радость"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-emoji">
                  Emoji <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cat-emoji"
                  value={formData.emoji}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                  placeholder="😊"
                  required
                  className="text-2xl text-center"
                />
              </div>
            </div>

            {/* Диапазон уровней */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cat-levelMin">
                  Мин. уровень <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cat-levelMin"
                  type="number"
                  min="20"
                  max="1000"
                  step="5"
                  value={formData.levelMin}
                  onChange={(e) => setFormData({ ...formData, levelMin: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-levelMax">
                  Макс. уровень <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cat-levelMax"
                  type="number"
                  min="20"
                  max="1000"
                  step="5"
                  value={formData.levelMax}
                  onChange={(e) => setFormData({ ...formData, levelMax: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Диапазон: {formData.levelMin} - {formData.levelMax} по шкале Хокинса (20-1000)
            </p>

            {/* Цвет */}
<div className="space-y-2">
  <Label htmlFor="cat-color">
    Цвет категории
  </Label>
  <div className="flex gap-2">
    <Input
      id="cat-color"
      type="color"
      value={formData.colorHex || ''} 
      onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
      className="w-20 h-10 p-1 cursor-pointer"
    />
    <Input
      type="text"
      value={formData.colorHex || ''} 
      onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
      placeholder="#000000"
      className="flex-1"
    />
  </div>
</div>

            {/* Описание */}
            <div className="space-y-2">
              <Label htmlFor="cat-description">
                Описание категории
              </Label>
              <Textarea
                id="cat-description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Опишите суть категории..."
                rows={3}
                className="resize-none"
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
              {loading ? 'Сохранение...' : category ? 'Сохранить' : 'Создать'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
