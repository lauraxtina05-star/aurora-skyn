import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({ variable: '--font-cormorant', subsets: ['latin'], weight: ['400','500','600'], style: ['normal','italic'] });
const jost = Jost({ variable: '--font-jost', subsets: ['latin'], weight: ['400','500','600'] });

export const metadata: Metadata = {
  title: 'Aurora Skyn | Personalized Skincare Education + Holistic Esthetics',
  description: 'Personalized virtual skin guidance and intentional in-spa esthetic care with licensed esthetician and skin educator Jasmine.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${cormorant.variable} ${jost.variable}`}>{children}</body></html>;
}
