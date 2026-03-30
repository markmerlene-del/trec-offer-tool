import { NextRequest, NextResponse } from 'next/server'
import { listFields } from '@/lib/pdf-filler'
import { ALL_FORMS } from '@/lib/trec-forms'

// Helper endpoint — returns the actual PDF field names for every TREC form.
// Use this during development to verify/update fieldMap entries in trec-forms.ts.
// Example: GET /api/list-fields?id=20-16
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  const forms = id ? ALL_FORMS.filter((f) => f.id === id) : ALL_FORMS

  const results = await Promise.allSettled(
    forms.map(async (formDef) => {
      const fields = await listFields(formDef.url)
      return { id: formDef.id, name: formDef.name, fields }
    })
  )

  const output = results.map((r) =>
    r.status === 'fulfilled' ? r.value : { error: r.reason?.message }
  )

  return NextResponse.json(output, { status: 200 })
}
