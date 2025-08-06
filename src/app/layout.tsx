import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CryptoLight - Cryptocurrency News',
  description: 'Latest news about cryptocurrencies, blockchain technology, and digital assets',
  keywords: 'cryptocurrency, bitcoin, blockchain, news, analysis',
  authors: [{ name: 'CryptoLight Team' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'CryptoLight',
    title: 'CryptoLight - Cryptocurrency News',
    description: 'Latest news about cryptocurrencies, blockchain technology, and digital assets',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'CryptoLight - Cryptocurrency News'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoLight - Cryptocurrency News',
    description: 'Latest news about cryptocurrencies, blockchain technology, and digital assets',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`],
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
