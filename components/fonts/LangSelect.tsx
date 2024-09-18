'use client'

import React from 'react'
import ToggleGroup from '@/components/ui-custom/togglegroup'

interface LangSelectProps {
  value: 'hangul' | 'roman'
  onChange: (value: 'hangul' | 'roman') => void
}

export default function LangSelect({ value, onChange }: LangSelectProps) {
  const options = [
    { value: 'hangul', label: '한글' },
    { value: 'roman', label: '로마자' },
  ]

  return (
    <ToggleGroup
      options={options.map((option) => option.label)}
      value={
        options.find((option) => option.value === value)?.label || '로마자'
      }
      onChange={(label) => {
        const selectedOption = options.find((option) => option.label === label)
        if (selectedOption) {
          onChange(selectedOption.value as 'hangul' | 'roman')
        }
      }}
      className=""
    />
  )
}
