import { NextRequest, NextResponse } from 'next/server'
import { getPdfInfo } from '@/lib/pdf-filler'
import { ALL_FORMS } from '@/lib/trec-forms'

// Returns page dimensions for each TREC form — useful for calibrating coordinates.
// GET /api/list-fields?id=20-16
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  const forms = id ? ALL_FORMS.filter((f) => f.id === id) : ALL_FORMS

  const results = await Promise.allSettled(
    forms.map(async (formDef) => {
      const info = await getPdfInfo(formDef.url)
      return { id: formDef.id, name: formDef.name, ...info }
    })
  )

  const output = results.map((r) =>
    r.status === 'fulfilled' ? r.value : { error: (r.reason as Error)?.message }
  )

  return NextResponse.json(output, { status: 200 })
}
