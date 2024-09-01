import * as React from 'react'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Footer } from '@/components/footer'

// import { absoluteUrl } from '@/lib/utils'

export default function RootPage() {
  return (
    <div>
      <Header />
      <main className="min-h-[80vh] pb-20 sm:pb-40">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
