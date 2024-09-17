'use client'

import React, { useState } from 'react'

import { LucideIcon } from '@/lib/lucide-icon'

import Slider from '@/components/ui-custom/slider'

export default function FontSizeSlider() {
  const [sliderValue, setSliderValue] = useState(28)

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex w-full flex-row items-center justify-between">
        <LucideIcon name="Type" className="size-3 text-neutral-400" />
        <p className="font-geistMono text-sm font-medium tracking-wide text-neutral-900">
          {sliderValue}px
        </p>
        <LucideIcon name="Type" className="size-4 text-neutral-400" />
      </div>
      <Slider
        value={sliderValue}
        min={8}
        max={72}
        step={4}
        onValueChange={setSliderValue}
      />
    </div>
  )
}
