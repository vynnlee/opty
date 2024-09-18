'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import supabase from '@/lib/supabaseClient'

import { LucideIcon } from '@/lib/lucide-icon'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import LangSelect from '@/components/fonts/LangSelect'
import CategorySelect from '@/components/fonts/CategorySelect'
import StyleSelect from '@/components/fonts/StyleSelect'
import FontSizeSlider from '@/components/fonts/FontSizeSlider'
import RegisterAdvCard from '@/components/cta/RegisterAdvCard'
import FontPreviewCard from '@/components/fonts/FontPreviewCard'
import { FontSearchForm } from '@/components/fonts/FontSearchForm'

import { Header } from '@/components/header'

const MAX_CHARS = 50

const previewTextSchema = z.object({
  previewText: z
    .string()
    .max(
      MAX_CHARS,
      `미리보기 텍스트는 최대 ${MAX_CHARS}자까지 입력 가능합니다.`
    ),
})

const PREVIEW_TEXTS = [
  'Free, but Better.',
  'Pack my box with five dozen liquor jugs.',
  'How vexingly quick daft zebras jump!',
]

type PreviewTextForm = z.infer<typeof previewTextSchema>

interface Font {
  id: number
  name: string
  commentary: string
  storage_url: string
  language: string
  authors: { authors: { id: number; name: string; link: string } }[]
  styles: { styles: { id: number; style: string } }[]
  categories: { id: number; category: string; subcategory: string | null }[]
}

export default function Fonts() {
  const [fonts, setFonts] = useState<Font[]>([])
  const [fontSize, setFontSize] = useState(56)
  const [selectedLanguage, setSelectedLanguage] = useState<'hangul' | 'roman'>(
    'hangul'
  )
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [charCount, setCharCount] = useState(0)

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PreviewTextForm>({
    resolver: zodResolver(previewTextSchema),
    defaultValues: {
      previewText: '',
    },
  })

  const previewText = watch('previewText')

  useEffect(() => {
    setCharCount(previewText.length)
  }, [previewText])

  useEffect(() => {
    const fetchFonts = async () => {
      const { data, error } = await supabase.from('fonts').select(`
        id,
        name,
        commentary,
        storage_url,
        language,
        authors:font_authors(authors(id, name, link)),
        styles:font_styles(styles(id, style)),
        categories(id, category, subcategory)
      `)

      if (error) {
        console.error('Error fetching fonts:', error)
      } else {
        setFonts(data || [])
      }
    }

    fetchFonts()
  }, [])

  const handleRandomText = useCallback(() => {
    let newText
    do {
      newText = PREVIEW_TEXTS[Math.floor(Math.random() * PREVIEW_TEXTS.length)]
    } while (newText === previewText && PREVIEW_TEXTS.length > 1)
    setValue('previewText', newText)
  }, [previewText, setValue])

  const handlePreviewTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newText = e.target.value.slice(0, MAX_CHARS)
    setValue('previewText', newText)
    setCharCount(newText.length)
  }

  const filteredFonts = fonts.filter((font) => {
    const languageMatch =
      !selectedLanguage || font.language === selectedLanguage
    const categoryMatch =
      selectedCategories.length === 0 ||
      font.categories.some((cat) =>
        selectedCategories.includes(cat.category_id.category)
      )
    const styleMatch =
      selectedStyles.length === 0 ||
      font.styles.some((style) => selectedStyles.includes(style.style_id.style))
    const searchMatch =
      searchQuery === '' ||
      font.name.toLowerCase().includes(searchQuery.toLowerCase())
    return languageMatch && categoryMatch && styleMatch && searchMatch
  })

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
                    onClick={handleRandomText}
                  >
                    <LucideIcon name="Shuffle" className="size-4" />
                    Random
                  </Button>
                </div>

                <div className="relative">
                  <Textarea
                    {...register('previewText')}
                    onChange={handlePreviewTextChange}
                    placeholder="아무 말이나 적어보세요."
                    className="resize-none border-none bg-neutral-100"
                  />
                  <span className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {charCount}/{MAX_CHARS}
                  </span>
                </div>
                {errors.previewText && (
                  <p className="text-xs text-red-500">
                    {errors.previewText.message}
                  </p>
                )}
              </div>
              {/* Preview size */}
              <div id="preview-size" className="flex flex-col gap-2">
                <Label
                  htmlFor="preview-size"
                  className="text-sm text-neutral-600"
                >
                  글꼴 크기
                </Label>
                <FontSizeSlider value={fontSize} onValueChange={setFontSize} />
              </div>
            </div>
            {/* Filter section */}
            <div
              id="filter-section"
              className="flex flex-col gap-6 overflow-hidden p-4 scrollbar-hide"
            >
              <FontSearchForm className="" onSearch={setSearchQuery} />
              {/* Language filter */}
              <div id="filter-language" className="flex flex-col gap-2">
                <Label
                  htmlFor="filter-language"
                  className="flex flex-row items-center gap-1 text-sm text-neutral-600"
                >
                  <LucideIcon name="Languages" className="size-4" />
                  언어
                </Label>
                <LangSelect
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                />
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
                <CategorySelect
                  selectedLanguage={selectedLanguage}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                />
              </div>
              {/* Style filter */}
              <div id="filter-style" className="flex flex-col gap-2">
                <Label
                  htmlFor="filter-style"
                  className="flex flex-row items-center gap-1 text-sm text-neutral-600"
                >
                  <LucideIcon name="Blend" className="size-4" />
                  스타일
                </Label>
                <StyleSelect
                  selectedLanguage={selectedLanguage}
                  value={selectedStyles}
                  onChange={setSelectedStyles}
                />
              </div>
            </div>
          </div>
        </section>
        {/* Explore Section */}
        <section
          id="explore"
          className="flex flex-col gap-4 overflow-y-auto bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] px-4 pt-4 scrollbar-hide [background-size:16px_16px]"
        >
          {filteredFonts.map((font) => (
            <FontPreviewCard
              key={font.id}
              name={font.name}
              authors={font.authors}
              fontUrl={font.storage_url}
              comment={font.commentary}
              downloadUrl={font.storage_url}
              previewText={previewText}
              fontSize={fontSize}
            />
          ))}
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
