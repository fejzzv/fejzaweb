import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist'
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'fejza - Muzičar, Producent & Grafički Dizajner.',
  description: 'fejza - Muzičar, Producent, Mix & Mastering Inžinjer i Grafički Dizajner.',
  keywords: ['Artist', 'Music Producent', 'portfolio', 'Mixing Inžinjer • Mastering Inžinjer Inžinjer', 'Graphic Designer'],
  authors: [{ name: 'fejza' }],
  openGraph: {
    title: 'fejza - Muzičar, Producent & Grafički Dizajner.',
    description: 'fejza - Muzičar, Producent, Mix & Mastering Inžinjer i Grafički Dizajner.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
