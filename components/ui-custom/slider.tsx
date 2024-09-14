'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface SliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  onValueChange: (value: number) => void
}

export default function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
}: SliderProps) {
  // 눈금 개수 계산
  const stepsCount = (max - min) / step

  return (
    <div className="relative w-full">
      <SliderPrimitive.Root
        className="relative flex h-5 w-full touch-none select-none items-center"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onValueChange(v[0])}
      >
        {/* 트랙 */}
        <SliderPrimitive.Track className="relative h-[4px] grow rounded-full bg-neutral-200">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-brandPrimary" />
        </SliderPrimitive.Track>

        {/* 슬라이더 핸들 */}
        <SliderPrimitive.Thumb
          className={cn(
            'block h-3 w-3 rounded-full border border-neutral-400 bg-white shadow focus:outline-none',
            'cursor-pointer', // 포인터 모양 변경
            'transform transition duration-200 ease-in-out', // 애니메이션 속성
            'active:scale-125' // 누를 때 크기 1.25배 확대
          )}
        />
      </SliderPrimitive.Root>

      {/* 눈금 표시 */}
      <div className="flex w-full flex-row items-center justify-between px-2">
        {Array.from({ length: stepsCount + 1 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-[1px] bg-neutral-300',
              i === 0 || i === stepsCount ? 'h-[8px]' : 'h-[4px]' // 양 끝 눈금 길이 변경
            )}
          />
        ))}
      </div>
    </div>
  )
}
