'use client'

import { useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export default function LanguageSelect() {
  const [selectedLanguage, setSelectedLanguage] = useState('all')

  return (
    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">전체</SelectItem>
        <SelectItem value="ko">한국어</SelectItem>
        <SelectItem value="en">영어</SelectItem>
      </SelectContent>
    </Select>
  )
}
