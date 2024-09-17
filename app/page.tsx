import * as React from 'react'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Footer } from '@/components/footer'

// import { absoluteUrl } from '@/lib/utils'

export default function RootPage() {
  return (
    <div>
      <Header />
      <main className="flex min-h-[80vh] flex-col pb-20 sm:pb-40">
        <Hero />
        <div className="container mt-8">
          <h2 className="spacing-tight text-2xl font-semibold text-neutral-800">
            글꼴 훑어보기
          </h2>
        </div>
      </main>
      <Footer />
    </div>
  )
}
