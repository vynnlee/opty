'use client'

import React from 'react'

import { LucideIcon } from '@/lib/lucide-icon'

import Slider from '@/components/ui-custom/slider'

interface FontSizeSliderProps {
  value: number
  onValueChange: (value: number) => void
}

export default function FontSizeSlider({
  value,
  onValueChange,
}: FontSizeSliderProps) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex w-full flex-row items-center justify-between">
        <LucideIcon name="Type" className="size-3 text-neutral-400" />
        <p className="font-geistMono text-sm font-medium tracking-wide text-neutral-900">
          {value}px
        </p>
        <LucideIcon name="Type" className="size-4 text-neutral-400" />
      </div>
      <Slider
        value={value}
        min={32}
        max={120}
        step={4}
        onValueChange={onValueChange}
      />
    </div>
  )
}
