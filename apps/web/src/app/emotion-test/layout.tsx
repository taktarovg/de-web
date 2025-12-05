import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Тест на эмоции | Нейропсихологический анализ эмоций',
  description: 'Бесплатный тест для определения эмоций, которые блокируют достижение ваших целей. Узнайте свой эмоциональный паттерн за 5 минут.',
  keywords: ['тест на эмоции', 'анализ эмоций', 'эмоциональный интеллект', 'нейропсихологический тест', 'определение эмоций'],
  openGraph: {
    title: 'Тест на эмоции | Нейропсихологический анализ',
    description: 'Узнайте, какая эмоция блокирует достижение вашей цели. Бесплатный тест за 5 минут.',
    url: 'https://designemotion.ru/emotion-test',
    siteName: 'Design Emotion',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Тест на эмоции | Нейропсихологический анализ',
    description: 'Узнайте, какая эмоция блокирует достижение вашей цели',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EmotionTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
