// Fonts.jsx

'use client'

import Image from 'next/image'
import { LucideIcon } from '@/lib/lucide-icon'
import LogoFull from '@/public/assets/logos/logo-full.svg'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import LangSelect from '@/components/fonts/LangSelect'
import CategorySelect from '@/components/fonts/CategorySelect'
import FontSizeSlider from '@/components/fonts/FontSizeSlider'
import RegisterAdvCard from '@/components/cta/RegisterAdvCard'
import FontPreviewCard from '@/components/fonts/FontPreviewCard'
import { FontSearchForm } from '@/components/fonts/FontSearchForm'

import { Header } from '@/components/header'

export default function Fonts() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grid flex-1 grid-cols-[280px_1fr_280px] overflow-hidden">
        <section id="sidebar" className="flex flex-col border-r">
          <div className="fixed grid h-full grid-rows-[auto_1fr] overflow-hidden">
            <div
              id="setting-section"
              className="flex flex-col gap-6 overflow-hidden border-b p-4 pb-8 scrollbar-hide"
            >
              {/* Preview text */}
              <div id="preview-text" className="flex flex-col gap-2">
                <div className="flex w-full flex-row items-center justify-between">
                  <Label
                    htmlFor="preview-text"
                    className="text-sm text-neutral-600"
                  >
                    미리보기
                  </Label>
                  <Button
                    variant="outline"
                    size="chip"
                    className="gap-1 font-geistMono text-[12px] font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-500"
                  >
                    <LucideIcon name="Shuffle" className="size-4" />
                    Random
                  </Button>
                </div>

                <Textarea
                  placeholder="아무 말이나 적어보세요."
                  className="resize-none border-none bg-neutral-100"
                />
              </div>
              {/* Preview size */}
              <div id="preview-size" className="flex flex-col gap-2">
                <Label
                  htmlFor="preview-size"
                  className="text-sm text-neutral-600"
                >
                  글꼴 크기
                </Label>
                <FontSizeSlider />
              </div>
            </div>
            {/* Filter section */}
            <div
              id="filter-section"
              className="flex flex-col gap-6 overflow-hidden p-4 scrollbar-hide"
            >
              <FontSearchForm className="" />
              {/* Language filter */}
              <div id="filter-language" className="flex flex-col gap-2">
                <Label
                  htmlFor="filter-language"
                  className="flex flex-row items-center gap-1 text-sm text-neutral-600"
                >
                  <LucideIcon name="Languages" className="size-4" />
                  언어
                </Label>
                <LangSelect />
              </div>
              {/* Category filter */}
              <div id="filter-category" className="flex flex-col gap-2">
                <Label
                  htmlFor="filter-category"
                  className="flex flex-row items-center gap-1 text-sm text-neutral-600"
                >
                  <LucideIcon name="Tag" className="size-4" />
                  카테고리
                </Label>
                <CategorySelect />
              </div>
              {/* Personality filter */}
              <div id="filter-personality" className="flex flex-col gap-2">
                <Label
                  htmlFor="filter-personality"
                  className="flex flex-row items-center gap-1 text-sm text-neutral-600"
                >
                  <LucideIcon name="Blend" className="size-4" />
                  느낌
                </Label>
                <CategorySelect />
              </div>
            </div>
          </div>
        </section>
        {/* Explore Section */}
        <section
          id="explore"
          className="flex flex-col gap-4 overflow-y-auto bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] px-4 pt-4 scrollbar-hide [background-size:16px_16px]"
        >
          <FontPreviewCard />
          <FontPreviewCard />
          <FontPreviewCard />
          <FontPreviewCard />
        </section>
        {/* AI Search Section */}
        <section id="ai-search" className="flex flex-col border-l">
          <div className="fixed grid h-full grid-rows-[1fr_340px] overflow-hidden">
            <div
              id="ai-section"
              className="flex flex-col gap-6 overflow-y-auto px-4 pt-4 scrollbar-hide"
            >
              {/* AI section content */}
            </div>
            <div id="footer-section" className="overflow-hidden p-3">
              <RegisterAdvCard />
              <footer className="mb-2 mt-4">
                <p className="text-xs text-neutral-400">
                  © 2024 <span className="font-bold">OpenTypo</span>. All
                  rights reserved.
                </p>
              </footer>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
