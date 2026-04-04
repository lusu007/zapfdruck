import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Zapfdruck Rechner - Beer Pressure Calculator',
  description:
    'Calculate the optimal pressure for your beer tapping system. German beer pressure calculator for perfect beer dispensing.',
  keywords:
    'beer pressure, zapfdruck, beer tapping, pressure calculator, bierdruck',
  openGraph: {
    title: 'Zapfdruck Rechner',
    description: 'Calculate the optimal pressure for your beer tapping system',
    type: 'website',
    locale: 'de_DE',
  },
  icons: {
    apple: '/favicon.ico',
  },
  manifest: '/img/site.webmanifest',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link
          rel="mask-icon"
          href="/img/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
      </head>
      <body>{children}</body>
    </html>
  );
}
