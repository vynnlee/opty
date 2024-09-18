'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { LucideIcon } from '@/lib/lucide-icon'
import { CloudDownload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Author {
  name: string
  link: string
}

interface FontCardProps {
  name?: string
  authors?: Author[]
  fontUrl?: string
  downloadUrl?: string
  comment?: string
}

export default function FontPreviewCard({
  name = 'Sample Font',
  authors = [{ name: 'Unknown Author', link: '#' }],
  fontUrl = '',
  downloadUrl = '#',
  comment = 'No comments available.',
}: FontCardProps) {
  // 폰트 이름을 편집할 수 있는 상태
  const [editableName, setEditableName] = useState(name)
  // 폰트 로딩 여부 상태
  const [fontLoaded, setFontLoaded] = useState(false)

  // 폰트 로딩 및 상태 관리
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

  // 저자 정보를 JSX로 변환하는 함수
  const renderAuthors = () =>
    authors.map((author, index) => (
      <span key={index}>
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

  return (
    <Card className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-none">
      <CardHeader className="px-6 py-4">
        <div className="flex w-full flex-row justify-between">
          <p className="text-base font-medium text-neutral-500">{name}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3">
        <input
          type="text"
          className="w-full border-none bg-transparent text-6xl text-neutral-900 outline-none"
          style={{
            fontFamily: fontLoaded ? name : 'inherit',
            opacity: fontLoaded ? 0.5 : 1,
          }}
          value={editableName}
          onChange={(e) => setEditableName(e.target.value)}
        />
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
