import { NextResponse } from 'next/server'
import supabase from '@/lib/supabaseClient'

export async function GET() {
  const { data, error } = await supabase.from('fonts').select(`
      id,
      name,
      commentary,
      storage_url,
      authors:font_authors(author_id (name, link)),
      styles:font_styles(style_id (style))
    `)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
