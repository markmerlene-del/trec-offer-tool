import { NextRequest, NextResponse } from 'next/server'
import JSZip from 'jszip'
import { OfferFormData } from '@/lib/types'
import { fillForm } from '@/lib/pdf-filler'
import {
  FORM_20_16,
  FORM_40_10,
  FORM_37_6,
  FORM_10_7,
  FORM_OP_L,
  FORM_11_8,
  FORM_16_6,
  FORM_15_6,
  TrecFormDef,
} from '@/lib/trec-forms'

export const maxDuration = 60 // Vercel Pro: up to 60s; Hobby: 10s

export async function POST(req: NextRequest) {
  let data: OfferFormData
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Determine which forms to include
  const forms: TrecFormDef[] = [FORM_20_16]

  if (data.financing.paymentType === 'third-party') {
    forms.push(FORM_40_10)
  }

  if (data.addenda.hasHOA) {
    forms.push(FORM_37_6)
  }

  if (data.addenda.buyerHasPropertyToSell) {
    forms.push(FORM_10_7)
  }

  if (data.addenda.builtBefore1978) {
    forms.push(FORM_OP_L)
  }

  if (data.addenda.nonRealtyItems.trim()) {
    forms.push(FORM_11_8)
  }

  if (data.addenda.buyerTempLease) {
    forms.push(FORM_16_6)
  }

  if (data.addenda.sellerTempLease) {
    forms.push(FORM_15_6)
  }

  const debug = req.nextUrl.searchParams.get('debug') === '1'

  // Fill all forms in parallel
  const results = await Promise.allSettled(
    forms.map(async (formDef) => {
      const bytes = await fillForm(formDef, data, debug)
      return { formDef, bytes }
    })
  )

  const zip = new JSZip()
  const errors: string[] = []

  for (const result of results) {
    if (result.status === 'fulfilled') {
      const { formDef, bytes } = result.value
      zip.file(`TREC-${formDef.id}-${formDef.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`, bytes)
    } else {
      errors.push(result.reason?.message ?? 'Unknown error')
    }
  }

  if (errors.length > 0 && zip.files && Object.keys(zip.files).length === 0) {
    return NextResponse.json(
      { error: 'All forms failed to generate', details: errors },
      { status: 500 }
    )
  }

  const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' })

  return new NextResponse(zipBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="TREC-Offer-Package.zip"`,
    },
  })
}
