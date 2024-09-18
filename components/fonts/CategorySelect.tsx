'use client'

import { useState, useEffect } from 'react'
import MultiSelect from '@/components/ui-custom/multiselect'
import supabase from '@/lib/supabaseClient'

interface CategorySelectProps {
  selectedLanguage: 'hangul' | 'roman'
  value: string[]
  onChange: (categories: string[]) => void
}

interface Category {
  id: number
  language: string
  category: string
  subcategory: string | null
}

interface GroupedCategory {
  label: string
  options: { id: string; label: string }[]
}

export default function CategorySelect({
  selectedLanguage,
  value,
  onChange,
}: CategorySelectProps) {
  const [categoryOptions, setCategoryOptions] = useState<GroupedCategory[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('language', selectedLanguage)

      if (error) {
        console.error('Error fetching categories:', error)
      } else {
        const groupedCategories: {
          [key: string]: { id: string; label: string }[]
        } = {}
        data.forEach((item: Category) => {
          const optionLabel = item.subcategory || item.category
          const groupLabel = item.subcategory ? item.category : 'Ungrouped'

          if (!groupedCategories[groupLabel]) {
            groupedCategories[groupLabel] = []
          }

          groupedCategories[groupLabel].push({
            id: item.id.toString(),
            label: optionLabel,
          })
        })

        const formattedOptions: GroupedCategory[] = Object.entries(
          groupedCategories
        ).map(([key, value]) => ({
          label: key,
          options: value,
        }))

        setCategoryOptions(formattedOptions)
      }
    }

    fetchCategories()
  }, [selectedLanguage])

  return (
    <div>
      <MultiSelect
        options={categoryOptions}
        selectedOptions={value}
        onChange={onChange}
        placeholder="카테고리를 선택하세요"
        className="w-full"
      />
    </div>
  )
}
