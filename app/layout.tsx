import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'SafeTrade',
  description: 'Mini e-commerce for safe used goods trading.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sora.variable}>
      <body>
        <div className="min-h-screen bg-grid">
          <Header />
          <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
