'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { z } from 'zod'
import { LucideIcon } from '@/lib/lucide-icon'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Author {
  id: number
  name: string
  link: string
}

interface FontCardProps {
  name?: string
  authors?: { authors: Author }[]
  fontUrl?: string
  downloadUrl?: string
  comment?: string
  previewText: string
  fontSize: number
}

const MAX_CHARS = 50

const previewTextSchema = z
  .string()
  .max(MAX_CHARS, `미리보기 텍스트는 최대 ${MAX_CHARS}자까지 입력 가능합니다.`)

export default function FontPreviewCard({
  name = 'Sample Font',
  authors = [{ authors: { id: 0, name: 'Unknown Author', link: '#' } }],
  fontUrl = '',
  downloadUrl = '#',
  comment = 'No comments available.',
  previewText,
  fontSize,
}: FontCardProps) {
  const [fontLoaded, setFontLoaded] = useState(false)
  const [localPreviewText, setLocalPreviewText] = useState(
    previewText.slice(0, MAX_CHARS)
  )
  const [charCount, setCharCount] = useState(previewText.length)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLocalPreviewText(previewText.slice(0, MAX_CHARS))
    setCharCount(previewText.length)
  }, [previewText])

  useEffect(() => {
    if (fontUrl) {
      const fontFace = new FontFace(name, `url("${fontUrl}")`)
      fontFace
        .load()
        .then((loadedFace) => {
          document.fonts.add(loadedFace)
          setFontLoaded(true)
        })
        .catch((err) => {
          console.error(`Error loading font ${name}:`, err)
        })
    }
  }, [name, fontUrl])

  const renderAuthors = () =>
    authors.map(({ authors: author }, index) => (
      <span key={author.id}>
        <a
          className="hover:underline"
          href={author.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {author.name}
        </a>
        {index < authors.length - 1 ? ', ' : ''}
      </span>
    ))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value
    try {
      previewTextSchema.parse(newText)
      setLocalPreviewText(newText)
      setCharCount(newText.length)
      setError(null)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      }
    }
  }

  const displayText = localPreviewText.trim() || name

  return (
    <Card className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-none">
      <CardHeader className="px-6 py-4">
        <div className="flex w-full flex-row justify-between">
          <p className="text-base font-medium text-neutral-500">{name}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3">
        <div className="relative">
          <input
            type="text"
            className="w-full border-none bg-transparent outline-none"
            style={{
              fontFamily: fontLoaded ? name : 'inherit',
              opacity: fontLoaded ? 1 : 0.5,
              fontSize: `${fontSize}px`,
            }}
            value={displayText}
            onChange={handleInputChange}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <p className="text-sm text-neutral-600">
          Designed by {renderAuthors()}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-4 bg-white py-3 pr-3 md:flex-row">
        <div className="flex-0 flex flex-row gap-3">
          <div className="flex-none text-sm font-medium text-neutral-500">
            코멘터리
          </div>
          <div className="font-regular w-full text-sm">{comment}</div>
        </div>
        <div className="flex flex-row gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download font ${name}`}
                  className="flex w-full flex-none items-center justify-center rounded-full border py-3 pl-4 pr-8 font-medium text-neutral-800 hover:bg-gray-50 md:w-fit md:py-2 md:pl-3 md:pr-4"
                >
                  <LucideIcon
                    name="CloudDownload"
                    className="mr-2 size-4 text-brandPrimary"
                  />
                  <p className="text-md md:text-sm">다운로드</p>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>원작자의 다운로드 페이지로 이동합니다.</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  className="h-[38px] rounded-full bg-neutral-50"
                >
                  <LucideIcon
                    name="Bookmark"
                    className="size-4 text-neutral-900"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>북마크에 저장</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  )
}
