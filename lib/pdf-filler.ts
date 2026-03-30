import { PDFDocument } from 'pdf-lib'
import { OfferFormData } from './types'
import { TrecFormDef } from './trec-forms'

/**
 * Download a PDF from a URL and return raw bytes.
 * We avoid caching so we always get the latest TREC version.
 */
export async function downloadPdf(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`)
  }
  return res.arrayBuffer()
}

/**
 * Flatten our OfferFormData into a simple key→value map that matches
 * the keys used in each form's fieldMap.
 */
function buildValueMap(data: OfferFormData): Record<string, string> {
  const b = data.buyer
  const p = data.property
  const t = data.terms
  const f = data.financing
  const c = data.closing
  const a = data.addenda

  const buyerNames = [
    [b.buyer1FirstName, b.buyer1LastName].filter(Boolean).join(' '),
    [b.buyer2FirstName, b.buyer2LastName].filter(Boolean).join(' '),
  ]
    .filter(Boolean)
    .join(' and ')

  const buyer1Full = [b.buyer1FirstName, b.buyer1LastName].filter(Boolean).join(' ')

  const cashPortion =
    f.paymentType === 'cash'
      ? t.salesPrice
      : String(parseFloat(t.salesPrice.replace(/,/g, '') || '0') - parseFloat(f.loanAmount.replace(/,/g, '') || '0'))

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
    buyer1Name: buyer1Full,
    buyer2Name: [b.buyer2FirstName, b.buyer2LastName].filter(Boolean).join(' '),
    buyerNames,
    propertyAddress: `${p.streetAddress}, ${p.city}, ${p.state} ${p.zip}`,
    city: p.city,
    county: p.county,
    legalDescription: p.legalDescription,
    salesPrice: formatCurrency(t.salesPrice),
    cashPortion: formatCurrency(String(cashPortion)),
    loanAmount: formatCurrency(f.loanAmount),
    earnestMoney: formatCurrency(t.earnestMoney),
    earnestMoneyHolder: t.earnestMoneyHolder,
    optionFee: formatCurrency(t.optionFee),
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
  }
}

function formatCurrency(value: string): string {
  const num = parseFloat(value.replace(/,/g, '') || '0')
  if (isNaN(num)) return value
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/**
 * Fill a single TREC form PDF with data from the offer form.
 * Returns the filled PDF bytes.
 */
export async function fillForm(
  formDef: TrecFormDef,
  data: OfferFormData
): Promise<Uint8Array> {
  const pdfBytes = await downloadPdf(formDef.url)
  const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
  const form = pdf.getForm()
  const values = buildValueMap(data)

  for (const [dataKey, pdfFieldName] of Object.entries(formDef.fieldMap)) {
    const value = values[dataKey]
    if (!value) continue
    try {
      const field = form.getTextField(pdfFieldName)
      field.setText(value)
    } catch {
      // Field name may differ in this version — silently skip
    }
  }

  // Flatten so the filled values are visible even in readers that don't support forms
  try {
    form.flatten()
  } catch {
    // Some encrypted forms cannot be flattened — leave interactive
  }

  return pdf.save()
}

/**
 * Return the actual PDF field names for a form (useful for debugging / mapping).
 */
export async function listFields(url: string): Promise<string[]> {
  const pdfBytes = await downloadPdf(url)
  const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
  const form = pdf.getForm()
  return form.getFields().map((f) => f.getName())
}
