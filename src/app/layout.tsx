import type { Metadata } from 'next';
import './globals.css';

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
    icon: '/img/favicon-32x32.png',
    apple: '/img/apple-touch-icon.png',
  },
  manifest: '/img/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicon-16x16.png"
        />
        <link rel="manifest" href="/img/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/img/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>{children}</body>
    </html>
  );
}
