import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '../components/ThemeProvider'
import Navbar from '../components/Navbar'

export const metadata: Metadata = {
  title: 'Training Tracker A-B-C',
  description: 'PWA per tracciare allenamenti con Google Sheets',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/icons/icon-192.png' },
    { rel: 'apple-touch-icon', url: '/icons/apple-touch-icon.png' },
  ],
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <div className="mx-auto max-w-3xl px-3 sm:px-6 py-4">
            <Navbar />
            <div className="py-4">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
