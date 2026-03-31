import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './extracted-tailwind.css';
import { Navigation } from '@/components/Navigation';

const fontSans = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Homepage',
  description: ``,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${fontSans.className} antialiased`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
