import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2026: Протокол Спокойной Силы | Дизайн Эмоций',
  description: 'Интенсив для лидеров, которые готовятся к турбулентности. Превратите хаос 2026 года в возможности через персональное сопровождение.',
  keywords: ['эмоциональный интеллект', 'интенсив для лидеров', 'кризис 2026', 'эмоциональная стабильность', 'лидерство'],
  openGraph: {
    title: '2026: Протокол Спокойной Силы | Дизайн Эмоций',
    description: 'Интенсив для лидеров, которые готовятся к турбулентности. Превратите хаос 2026 года в возможности.',
    url: 'https://designemotion.ru/navigator-2026',
    siteName: 'Design Emotion',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026: Протокол Спокойной Силы',
    description: 'Интенсив для лидеров, которые готовятся к турбулентности',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Navigator2026Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
