/**
 * Emotion Journal Storage (localStorage)
 * 
 * Управление дневником эмоций для анонимных пользователей
 * Данные хранятся в localStorage браузера
 */

export interface JournalEntry {
  id: string;
  date: string; // ISO 8601
  emotion: {
    id: string;
    name: string;
    emoji: string;
    category: string;
    level: number;
  };
  goal: string;
  hawkinsLevel: number;
  analysisId?: string;
}

const JOURNAL_KEY = 'emotionJournal';
const MAX_ENTRIES = 30; // Храним последние 30 записей

/**
 * Получить все записи из дневника
 */
export function getJournalEntries(): JournalEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(JOURNAL_KEY);
    if (!data) return [];
    
    const entries: JournalEntry[] = JSON.parse(data);
    return entries.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error reading journal:', error);
    return [];
  }
}

/**
 * Получить записи за последние N дней
 */
export function getRecentEntries(days: number = 7): JournalEntry[] {
  const entries = getJournalEntries();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return entries.filter(entry => 
    new Date(entry.date) >= cutoffDate
  );
}

/**
 * Добавить новую запись в дневник
 */
export function addJournalEntry(entry: Omit<JournalEntry, 'id' | 'date'>): JournalEntry {
  if (typeof window === 'undefined') {
    throw new Error('localStorage is not available');
  }
  
  const newEntry: JournalEntry = {
    ...entry,
    id: generateId(),
    date: new Date().toISOString()
  };
  
  const entries = getJournalEntries();
  entries.unshift(newEntry);
  
  // Ограничиваем количество записей
  const trimmedEntries = entries.slice(0, MAX_ENTRIES);
  
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(trimmedEntries));
    return newEntry;
  } catch (error) {
    console.error('Error saving to journal:', error);
    throw error;
  }
}

/**
 * Удалить запись из дневника
 */
export function deleteJournalEntry(id: string): void {
  if (typeof window === 'undefined') return;
  
  const entries = getJournalEntries();
  const filtered = entries.filter(entry => entry.id !== id);
  
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    throw error;
  }
}

/**
 * Очистить весь дневник
 */
export function clearJournal(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(JOURNAL_KEY);
  } catch (error) {
    console.error('Error clearing journal:', error);
    throw error;
  }
}

/**
 * Получить статистику по дневнику
 */
export function getJournalStats(days: number = 7) {
  const entries = getRecentEntries(days);
  
  if (entries.length === 0) {
    return {
      totalEntries: 0,
      averageLevel: 0,
      topEmotion: null,
      emotionCounts: {},
      categoryCounts: {},
      trend: 'neutral' as 'up' | 'down' | 'neutral'
    };
  }
  
  // Средний уровень
  const averageLevel = Math.round(
    entries.reduce((sum, e) => sum + e.hawkinsLevel, 0) / entries.length
  );
  
  // Подсчет эмоций
  const emotionCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  
  entries.forEach(entry => {
    emotionCounts[entry.emotion.name] = (emotionCounts[entry.emotion.name] || 0) + 1;
    categoryCounts[entry.emotion.category] = (categoryCounts[entry.emotion.category] || 0) + 1;
  });
  
  // Самая частая эмоция
  const topEmotion = Object.entries(emotionCounts)
    .sort(([, a], [, b]) => b - a)[0];
  
  // Тренд (сравниваем первую и последнюю половину периода)
  const halfLength = Math.floor(entries.length / 2);
  const firstHalf = entries.slice(0, halfLength);
  const secondHalf = entries.slice(halfLength);
  
  const firstHalfAvg = firstHalf.reduce((sum, e) => sum + e.hawkinsLevel, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, e) => sum + e.hawkinsLevel, 0) / secondHalf.length;
  
  let trend: 'up' | 'down' | 'neutral' = 'neutral';
  if (firstHalfAvg > secondHalfAvg + 20) trend = 'up'; // Улучшение
  else if (firstHalfAvg < secondHalfAvg - 20) trend = 'down'; // Ухудшение
  
  return {
    totalEntries: entries.length,
    averageLevel,
    topEmotion: topEmotion ? { name: topEmotion[0], count: topEmotion[1] } : null,
    emotionCounts,
    categoryCounts,
    trend
  };
}

/**
 * Проверить, есть ли записи в дневнике
 */
export function hasJournalEntries(): boolean {
  return getJournalEntries().length > 0;
}

/**
 * Получить количество записей
 */
export function getJournalCount(): number {
  return getJournalEntries().length;
}

/**
 * Генерация уникального ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Экспорт дневника в JSON
 */
export function exportJournal(): string {
  const entries = getJournalEntries();
  return JSON.stringify(entries, null, 2);
}

/**
 * Импорт дневника из JSON
 */
export function importJournal(jsonData: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const entries: JournalEntry[] = JSON.parse(jsonData);
    
    // Валидация
    if (!Array.isArray(entries)) {
      throw new Error('Invalid journal data');
    }
    
    // Объединяем с существующими записями (без дубликатов)
    const existing = getJournalEntries();
    const existingIds = new Set(existing.map(e => e.id));
    
    const newEntries = entries.filter(e => !existingIds.has(e.id));
    const merged = [...existing, ...newEntries];
    
    // Сортируем и ограничиваем
    merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const trimmed = merged.slice(0, MAX_ENTRIES);
    
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error importing journal:', error);
    throw error;
  }
}
