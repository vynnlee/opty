'use client'

import { useState } from 'react'
import MultiSelect from '@/components/ui-custom/multiselect'

export default function CategorySelect() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // 사용할 카테고리 목록
  const categoryOptions = [
    { id: 'tech', label: '기술' },
    { id: 'health', label: '건강' },
    { id: 'finance', label: '금융' },
    { id: 'education', label: '교육' },
    { id: 'entertainment', label: '엔터테인먼트' },
  ]

  return (
    <div>
      <MultiSelect
        options={categoryOptions}
        selectedOptions={selectedCategories}
        onChange={setSelectedCategories}
        placeholder="카테고리를 선택하세요"
        className="w-full"
      />
    </div>
  )
}
