import type { Metadata } from 'next';
import { Open_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ variable: '--font-playfair', subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'] });
const openSans = Open_Sans({ variable: '--font-open-sans', subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Aurora Skyn | Personalized Skincare Education + Holistic Esthetics',
  description: 'Personalized virtual skin guidance and intentional in-spa esthetic care with licensed esthetician and skin educator Jasmine.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${playfair.variable} ${openSans.variable}`}>{children}</body></html>;
}
