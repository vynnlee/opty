'use client'

import React, { useState } from 'react'
import ToggleGroup from '@/components/ui-custom/togglegroup'

export default function LangSelect() {
  const [selected, setSelected] = useState('전체')

  return (
    <ToggleGroup
      options={['전체', '한국어', '영어']}
      value={selected}
      onChange={setSelected}
      className=""
    />
  )
}
