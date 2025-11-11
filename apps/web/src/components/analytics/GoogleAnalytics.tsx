'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export function GoogleAnalytics() {
  const [measurementId, setMeasurementId] = useState<string>('');

  useEffect(() => {
    // Загружаем ID с сервера
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.googleAnalyticsId) {
          setMeasurementId(data.googleAnalyticsId);
        }
      })
      .catch(err => console.error('Failed to load Google Analytics ID:', err));
  }, []);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
