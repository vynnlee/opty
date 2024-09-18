'use client'

import { useState, useEffect } from 'react'
import MultiSelect from '@/components/ui-custom/multiselect'
import supabase from '@/lib/supabaseClient'

interface StyleSelectProps {
  selectedLanguage: 'hangul' | 'roman'
  value: string[]
  onChange: (styles: string[]) => void
}

export default function StyleSelect({
  selectedLanguage,
  value,
  onChange,
}: StyleSelectProps) {
  const [styleOptions, setStyleOptions] = useState<
    { id: string; label: string }[]
  >([])

  useEffect(() => {
    const fetchStyles = async () => {
      const { data, error } = await supabase
        .from('styles')
        .select('*')
        .eq('language', selectedLanguage)

      if (error) {
        console.error('Error fetching styles:', error)
      } else {
        setStyleOptions(
          data.map((style) => ({
            id: style.id.toString(),
            label: style.style,
          }))
        )
      }
    }

    fetchStyles()
  }, [selectedLanguage])

  return (
    <div>
      <MultiSelect
        options={[{ label: 'Styles', options: styleOptions }]}
        selectedOptions={value}
        onChange={onChange}
        placeholder="스타일을 선택하세요"
        className="w-full"
      />
    </div>
  )
}
