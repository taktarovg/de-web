-- ====================================================================
-- Миграция: Система рассылок (Broadcasts)
-- Дата: 2025-10-15
-- Описание: Создание таблицы для хранения информационных/новостных рассылок
-- ====================================================================

-- 1. Добавляем недостающие колонки в users (если их нет)
DO $$ 
BEGIN
    -- Добавляем notifications_enabled если не существует
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'notifications_enabled'
    ) THEN
        ALTER TABLE users ADD COLUMN notifications_enabled BOOLEAN DEFAULT TRUE;
    END IF;

    -- Добавляем reminder_time если не существует
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'reminder_time'
    ) THEN
        ALTER TABLE users ADD COLUMN reminder_time VARCHAR(5) DEFAULT '09:00';
    END IF;

    -- Добавляем reminder_timezone если не существует
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'reminder_timezone'
    ) THEN
        ALTER TABLE users ADD COLUMN reminder_timezone VARCHAR(50) DEFAULT 'Europe/Moscow';
    END IF;

    -- Добавляем data_export_format если не существует
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'data_export_format'
    ) THEN
        ALTER TABLE users ADD COLUMN data_export_format VARCHAR(10) DEFAULT 'csv';
    END IF;

    -- Добавляем program_day если не существует
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'program_day'
    ) THEN
        ALTER TABLE users ADD COLUMN program_day INT DEFAULT 0;
    END IF;
END $$;

-- 2. Создаём enum для статуса рассылки (если не существует)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'broadcast_status') THEN
        CREATE TYPE broadcast_status AS ENUM ('draft', 'scheduled', 'sending', 'completed', 'failed');
    END IF;
END $$;

-- 3. Создаём таблицу broadcasts
CREATE TABLE IF NOT EXISTS broadcasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Основная информация
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Опциональные медиа
    image_url TEXT,
    button_text VARCHAR(100),
    button_url TEXT,
    
    -- Статус и метаданные
    status broadcast_status NOT NULL DEFAULT 'draft',
    scheduled_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    
    -- Статистика
    total_users INT DEFAULT 0,
    sent_count INT DEFAULT 0,
    failed_count INT DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 0.00,
    
    -- Фильтры получателей (JSON)
    target_filters JSONB DEFAULT '{}'::jsonb,
    
    -- Системные поля
    created_by VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Создаём таблицу для отслеживания доставки каждому пользователю
CREATE TABLE IF NOT EXISTS broadcast_deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    broadcast_id UUID NOT NULL REFERENCES broadcasts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Статус доставки
    delivered BOOLEAN DEFAULT FALSE,
    delivered_at TIMESTAMPTZ,
    
    -- Ошибка (если была)
    error_message TEXT,
    
    -- Метаданные
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Индекс для быстрого поиска
    UNIQUE(broadcast_id, user_id)
);

-- 5. Создаём индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_broadcasts_status ON broadcasts(status);
CREATE INDEX IF NOT EXISTS idx_broadcasts_created_at ON broadcasts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_broadcasts_scheduled_at ON broadcasts(scheduled_at);

CREATE INDEX IF NOT EXISTS idx_broadcast_deliveries_broadcast_id ON broadcast_deliveries(broadcast_id);
CREATE INDEX IF NOT EXISTS idx_broadcast_deliveries_user_id ON broadcast_deliveries(user_id);
CREATE INDEX IF NOT EXISTS idx_broadcast_deliveries_delivered ON broadcast_deliveries(delivered);

-- 6. Создаём функцию для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_broadcasts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Создаём триггер
DROP TRIGGER IF EXISTS trigger_broadcasts_updated_at ON broadcasts;
CREATE TRIGGER trigger_broadcasts_updated_at
    BEFORE UPDATE ON broadcasts
    FOR EACH ROW
    EXECUTE FUNCTION update_broadcasts_updated_at();

-- 8. Комментарии к таблицам
COMMENT ON TABLE broadcasts IS 'Рассылки пользователям';
COMMENT ON TABLE broadcast_deliveries IS 'Отслеживание доставки рассылок каждому пользователю';

COMMENT ON COLUMN broadcasts.status IS 'Статус: draft (черновик), scheduled (запланирована), sending (отправляется), completed (завершена), failed (ошибка)';
COMMENT ON COLUMN broadcasts.target_filters IS 'JSON фильтры для таргетинга: {"is_active": true, "min_checkins": 5, "language": "ru"}';
COMMENT ON COLUMN broadcasts.success_rate IS 'Процент успешно доставленных сообщений (0-100)';

-- 9. Вставляем тестовую рассылку (опционально)
INSERT INTO broadcasts (title, message, created_by) 
VALUES ('Добро пожаловать!', 'Привет! 👋 Спасибо, что присоединились к нашему боту для развития эмоционального интеллекта.', 'admin')
ON CONFLICT DO NOTHING;

-- 10. Проверяем результат
SELECT 
    'Таблицы созданы успешно!' as status,
    (SELECT COUNT(*) FROM broadcasts) as broadcasts_count,
    (SELECT COUNT(*) FROM users WHERE notifications_enabled = true) as users_with_notifications;
