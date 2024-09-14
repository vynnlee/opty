'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface MessageBubbleProps {
  text: string
}

export default function MessageBubble({ text }: MessageBubbleProps) {
  return (
    <div className="relative max-w-lg rounded-lg bg-gray-200 p-4 text-black">
      {text}
      <div className="absolute bottom-0 left-4 h-4 w-4 translate-y-1/2 rotate-45 transform bg-gray-200"></div>
    </div>
  )
}
