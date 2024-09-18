'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ToggleGroupProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function ToggleGroup({
  options,
  value,
  onChange,
  className,
}: ToggleGroupProps) {
  return (
    <div className="flex rounded-full bg-neutral-100 p-1">
      <div className={cn('relative inline-flex w-full', className)}>
        {/* 슬라이딩 배경 */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-white shadow transition-transform"
          style={{
            width: `${100 / options.length}%`,
            transform: `translateX(${options.indexOf(value) * 100}%)`,
          }}
        />

        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={cn(
              'relative z-10 flex-1 rounded-full px-2 py-2 text-center text-sm font-medium leading-tight transition-all',
              value === option
                ? 'text-black'
                : 'text-neutral-500 hover:bg-black/5'
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
