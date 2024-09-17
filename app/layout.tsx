import * as React from 'react'
import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { Analytics } from '@vercel/analytics/react'

import { Toaster } from '@/components/ui/sonner'
import { TailwindIndicator } from '@/components/tailwind-indicator'

import { AppProvider } from '@/context/app-provider'
import { I18nProvider } from '@/context/i18n-provider'
import { ThemeProvider } from '@/context/theme-provider'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { defaultLng } from '@/i18next.config'

import { Instrument_Serif } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

import { Header } from '@/components/header'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: siteConfig.title,
  description: siteConfig.description,
  manifest: '/manifest.json',
  verification: {
    google: 'IxvN4WdPU9_KS-Tte2fenLPbVODRkNwhyqrXGx2rAJw',
    // other: { 'naver-site-verification': '' },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  const cookieStore = cookies()
  const language = cookieStore.get('app:language')?.value || defaultLng
  const theme = cookieStore.get('app:theme')?.value || 'system'

  return (
    <html lang={language} suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          'flex min-h-screen flex-col',
          instrumentSerif.variable,
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <AppProvider>
          <I18nProvider value={{ language }}>
            <ThemeProvider value={{ theme }}>
              <div id="__next" className="flex flex-grow flex-col">
                {/* <Header /> */}
                <main className="flex-grow">{children}</main>
              </div>
              <Toaster richColors closeButton />
              <TailwindIndicator />
              {process.env.NODE_ENV === 'production' ? <Analytics /> : null}
            </ThemeProvider>
          </I18nProvider>
        </AppProvider>
      </body>
    </html>
  )
}
