import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Для лидеров бьюти-индустрии | Дизайн Эмоций',
  description: 'Персональная программа для руководителей салонов красоты. Ваш салон — отражение вашего состояния. Научитесь управлять эмоциями команды.',
  keywords: ['управление салоном красоты', 'эмоциональный интеллект', 'лидерство в бьюти', 'выгорание руководителя', 'управление командой'],
  openGraph: {
    title: 'Для лидеров бьюти-индустрии | Дизайн Эмоций',
    description: 'Персональная программа для руководителей салонов красоты. Ваш салон — отражение вашего состояния.',
    url: 'https://designemotion.ru/beauty-leaders',
    siteName: 'Design Emotion',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Для лидеров бьюти-индустрии',
    description: 'Персональная программа для руководителей салонов красоты',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BeautyLeadersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
