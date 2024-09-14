'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { RotateCcw, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter,
  DrawerCheckboxItem,
} from '@/components/ui/drawer'

// 커스텀 훅: 선택된 항목 상태를 관리
function useMultiSelect(initialSelected: string[]) {
  const [selected, setSelected] = useState<string[]>(initialSelected)

  const toggleItem = (id: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    )
  }

  const reset = () => setSelected([])

  return { selected, toggleItem, reset }
}

// 선택된 아이템 텍스트 표시 유틸리티 함수
function getSelectedItemsText(
  selectedItems: string[],
  options: { id: string; label: string }[],
  placeholder: string
) {
  if (selectedItems.length === 0) return placeholder
  const displayedItems = selectedItems.map(
    (id) => options.find((option) => option.id === id)?.label
  )
  return selectedItems.length > 2
    ? `${displayedItems.slice(0, 2).join(', ')} +${selectedItems.length - 2} more`
    : displayedItems.join(', ')
}

interface MultiSelectProps {
  options: { id: string; label: string }[]
  selectedOptions: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string // 추가된 부분
}

export default function MultiSelect({
  options,
  selectedOptions,
  onChange,
  placeholder = 'Select...',
  className, // 추가된 부분
}: MultiSelectProps) {
  const { selected, toggleItem, reset } = useMultiSelect(selectedOptions)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    onChange(selected)
  }, [selected, onChange])

  const selectedItemsText = getSelectedItemsText(selected, options, placeholder)

  // 옵션 렌더링 함수
  const renderOptions = () => (
    <div className="max-h-60 overflow-y-auto">
      {options.map((option) => (
        <React.Fragment key={option.id}>
          {isMobile ? (
            <DrawerCheckboxItem
              checked={selected.includes(option.id)}
              onCheckedChange={(checked) => toggleItem(option.id, checked)}
              className="py-4"
            >
              {option.label}
            </DrawerCheckboxItem>
          ) : (
            <DropdownMenuCheckboxItem
              checked={selected.includes(option.id)}
              keepOpenOnSelect={true} // 드롭다운이 꺼지지 않도록 설정
              onCheckedChange={(checked) => toggleItem(option.id, checked)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          )}
        </React.Fragment>
      ))}
    </div>
  )

  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className={`flex h-12 items-center justify-between space-x-1 ${className}`}
        >
          <p className="font-semibold text-neutral-900">{selectedItemsText}</p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl">Select Options</DrawerTitle>
          <DrawerDescription>Select the items you want</DrawerDescription>
        </DrawerHeader>
        {renderOptions()}
        <DrawerFooter className="flex-row border-t pt-4">
          <Button
            onClick={reset}
            variant="outline"
            className="text-md h-12 w-48 gap-1 font-medium"
          >
            <RotateCcw className="h-5 w-5" />
            Reset
          </Button>
          <DrawerClose className="h-full w-full" asChild>
            <Button
              variant="default"
              className="text-md h-12 w-full font-semibold"
            >
              Apply
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className={`flex items-center justify-between space-x-1 ${className}`}
        >
          <p className="font-semibold text-neutral-900">{selectedItemsText}</p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Select Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderOptions()}
        <DropdownMenuSeparator />
        <DropdownMenuItem keepOpenOnSelect={true}>
          <Button
            onClick={reset}
            variant="secondary"
            size="sm"
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
