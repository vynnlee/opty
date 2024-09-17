'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { LucideIcon } from '@/lib/lucide-icon'
import { cn } from '@/lib/utils'

interface FontSearchFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  placeholder?: string
  className?: string
}

const FontSearchForm = ({
  placeholder = 'Search font titles',
  className,
  ...props
}: FontSearchFormProps) => {
  // 추후 검색 로직을 추가할 수 있도록 함수 정의
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 검색 로직은 추후 추가 예정
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative flex w-full items-center', className)}
      {...props}
    >
      <Input
        placeholder={placeholder}
        className="border-none bg-neutral-100 pr-10"
      />
      <button type="submit" className="absolute right-4">
        <LucideIcon
          name="Search"
          className="size-4 min-w-4 text-muted-foreground"
        />
      </button>
    </form>
  )
}

export { FontSearchForm }
