import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { OfferFormData } from './types'
import { TrecFormDef } from './trec-forms'

export async function downloadPdf(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`)
  return res.arrayBuffer()
}

/** x, y, page (0-indexed), optional max width for wrapping */
export interface FieldCoord {
  x: number
  y: number
  page?: number
  maxWidth?: number
  size?: number
}

function buildValueMap(data: OfferFormData): Record<string, string> {
  const b = data.buyer
  const p = data.property
  const t = data.terms
  const f = data.financing
  const c = data.closing
  const a = data.addenda

  const buyer1Full = [b.buyer1FirstName, b.buyer1LastName].filter(Boolean).join(' ')
  const buyer2Full = [b.buyer2FirstName, b.buyer2LastName].filter(Boolean).join(' ')
  const buyerNames = [buyer1Full, buyer2Full].filter(Boolean).join(' and ')

  const salesPriceNum = parseFloat(t.salesPrice.replace(/,/g, '') || '0')
  const loanNum = parseFloat(f.loanAmount.replace(/,/g, '') || '0')
  const cashPortion = f.paymentType === 'cash' ? salesPriceNum : salesPriceNum - loanNum

  const possession = c.possessionAtClosing
    ? 'At Closing'
    : `${c.possessionDaysAfterClosing} days after closing`

  const loanTypeLabels: Record<string, string> = {
    conventional: 'Conventional',
    fha: 'FHA',
    va: 'VA',
    usda: 'USDA',
    other: f.loanOtherDescription || 'Other',
  }

  return {
    buyerNames,
    buyer1Name: buyer1Full,
    buyer2Name: buyer2Full,
    propertyAddress: p.streetAddress,
    cityStateZip: `${p.city}, ${p.state} ${p.zip}`,
    city: p.city,
    county: p.county,
    state: p.state,
    zip: p.zip,
    lot: p.lot,
    block: p.block,
    subdivision: p.subdivision,
    salesPrice: fmt(t.salesPrice),
    cashPortion: fmt(String(cashPortion)),
    loanAmount: fmt(f.loanAmount),
    earnestMoney: fmt(t.earnestMoney),
    earnestMoneyHolder: t.earnestMoneyHolder,
    optionFee: fmt(t.optionFee),
    optionDays: t.optionDays,
    titleCompany: c.titleCompanyName,
    closingDate: c.closingDate,
    possession,
    maxInterestRate: f.maxInterestRate,
    loanTermYears: f.loanTermYears,
    loanType: loanTypeLabels[f.loanType] || '',
    hoaName: a.hoaName,
    hoaManagementCompany: a.hoaManagementCompany,
    propertyToSellAddress: a.propertyToSellAddress,
    nonRealtyItems: a.nonRealtyItems,
    buyerTempLeaseDays: a.buyerTempLeaseDays,
    sellerTempLeaseDays: a.sellerTempLeaseDays,
    buyerEmail: b.email,
    buyerPhone: b.phone,
  }
}

function fmt(value: string): string {
  const num = parseFloat(value.replace(/,/g, '') || '0')
  if (isNaN(num)) return value
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export async function fillForm(
  formDef: TrecFormDef,
  data: OfferFormData,
  debug = false
): Promise<Uint8Array> {
  const pdfBytes = await downloadPdf(formDef.url)
  const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const pages = pdf.getPages()
  const values = buildValueMap(data)

  for (const [dataKey, coord] of Object.entries(formDef.coords)) {
    const value = values[dataKey]
    if (!value) continue
    const pageIndex = coord.page ?? 0
    const page = pages[pageIndex]
    if (!page) continue
    const fontSize = coord.size ?? 9

    if (debug) {
      // Draw a red dot to show where the text will land
      page.drawCircle({ x: coord.x, y: coord.y, size: 3, color: rgb(1, 0, 0) })
    }

    page.drawText(value, {
      x: coord.x,
      y: coord.y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
      maxWidth: coord.maxWidth,
    })
  }

  return pdf.save()
}

/** Returns raw bytes and page dimensions — useful for coordinate calibration */
export async function getPdfInfo(url: string): Promise<{ pages: { width: number; height: number }[] }> {
  const pdfBytes = await downloadPdf(url)
  const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
  const pages = pdf.getPages().map((p) => {
    const { width, height } = p.getSize()
    return { width, height }
  })
  return { pages }
}
