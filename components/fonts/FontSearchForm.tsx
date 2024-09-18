'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { LucideIcon } from '@/lib/lucide-icon'
import { cn } from '@/lib/utils'

interface FontSearchFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  placeholder?: string
  className?: string
  onSearch: (query: string) => void
}

const FontSearchForm = ({
  placeholder = 'Search font titles',
  className,
  onSearch,
  ...props
}: FontSearchFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('query') as string
    onSearch(query)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative flex w-full items-center', className)}
      {...props}
    >
      <Input
        name="query"
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
