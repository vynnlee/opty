'use client'

import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
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

// Custom hook: Manage selected items state
function useMultiSelect(
  initialSelected: string[],
  onChange: (selected: string[]) => void
) {
  const [selected, setSelected] = useState<string[]>(initialSelected)

  const toggleItem = useCallback(
    (id: string, checked: boolean) => {
      setSelected((prev) => {
        const newSelected = checked
          ? [...prev, id]
          : prev.filter((item) => item !== id)
        onChange(newSelected)
        return newSelected
      })
    },
    [onChange]
  )

  const reset = useCallback(() => {
    setSelected([])
    onChange([])
  }, [onChange])

  return { selected, toggleItem, reset }
}

// Utility function to display selected items text
function getSelectedItemsText(
  selectedItems: string[],
  options: { label: string; options: { id: string; label: string }[] }[],
  placeholder: string
) {
  if (selectedItems.length === 0) return placeholder
  const allOptions = options.flatMap((group) => group.options)
  const displayedItems = selectedItems.map(
    (id) => allOptions.find((option) => option.id === id)?.label
  )
  return selectedItems.length > 2
    ? `${displayedItems.slice(0, 2).join(', ')} +${selectedItems.length - 2} more`
    : displayedItems.join(', ')
}

interface MultiSelectProps {
  options: { label: string; options: { id: string; label: string }[] }[]
  selectedOptions: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export default function MultiSelect({
  options,
  selectedOptions,
  onChange,
  placeholder = 'Select...',
  className,
}: MultiSelectProps) {
  const { selected, toggleItem, reset } = useMultiSelect(
    selectedOptions,
    onChange
  )
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (JSON.stringify(selectedOptions) !== JSON.stringify(selected)) {
      onChange(selected)
    }
  }, [selected, selectedOptions, onChange])

  const selectedItemsText = getSelectedItemsText(selected, options, placeholder)

  // Options rendering function
  const renderOptions = useCallback(
    () => (
      <div className="max-h-60 overflow-y-auto">
        {options.map((group) => (
          <React.Fragment key={group.label}>
            {isMobile ? (
              <>
                <DrawerTitle className="px-4 py-2 text-sm font-semibold">
                  {group.label}
                </DrawerTitle>
                {group.options.map((option) => (
                  <DrawerCheckboxItem
                    key={option.id}
                    checked={selected.includes(option.id)}
                    onCheckedChange={(checked) =>
                      toggleItem(option.id, checked)
                    }
                    className="py-4"
                  >
                    {option.label}
                  </DrawerCheckboxItem>
                ))}
              </>
            ) : (
              <DropdownMenuGroup>
                <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                {group.options.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.id}
                    checked={selected.includes(option.id)}
                    onCheckedChange={(checked) =>
                      toggleItem(option.id, checked)
                    }
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            )}
            {!isMobile && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </div>
    ),
    [isMobile, options, selected, toggleItem]
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
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
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
