import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MASTERSTROKE — Zero-stress NEET preparation',
  description: 'A Gen Z AI learning platform for NEET aspirants with NCERT-first lectures, AI mentors, voice tutoring, and streak-based practice.',
  metadataBase: new URL('https://masterstroke.alamezlab.online'),
  alternates: { canonical: '/' },
  generator: 'v0.app',
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#0b0f19', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
