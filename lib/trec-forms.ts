import { FieldCoord } from './pdf-filler'

export interface TrecFormDef {
  id: string
  name: string
  url: string
  coords: Record<string, FieldCoord>
}

export const TREC_BASE = 'https://www.trec.texas.gov/sites/default/files/pdf-forms'

// ─────────────────────────────────────────────────────────────────────────────
// One to Four Family Residential Contract (Resale) — TREC 20-16
// Page size: 612 x 792 pt (8.5 x 11 in)
// Coordinates are x from left edge, y from bottom edge (pdf-lib convention)
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_20_16: TrecFormDef = {
  id: '20-16',
  name: 'One to Four Family Residential Contract (Resale)',
  url: `${TREC_BASE}/20-16.pdf`,
  coords: {
    buyerNames:         { x: 128, y: 693, page: 0, maxWidth: 420, size: 9 },
    propertyAddress:    { x: 88,  y: 650, page: 0, maxWidth: 320, size: 9 },
    city:               { x: 88,  y: 632, page: 0, maxWidth: 160, size: 9 },
    county:             { x: 350, y: 632, page: 0, maxWidth: 160, size: 9 },
    legalDescription:   { x: 88,  y: 612, page: 0, maxWidth: 450, size: 9 },
    salesPrice:         { x: 370, y: 565, page: 0, maxWidth: 120, size: 9 },
    cashPortion:        { x: 370, y: 548, page: 0, maxWidth: 120, size: 9 },
    loanAmount:         { x: 370, y: 530, page: 0, maxWidth: 120, size: 9 },
    earnestMoney:       { x: 200, y: 490, page: 0, maxWidth: 120, size: 9 },
    earnestMoneyHolder: { x: 370, y: 490, page: 0, maxWidth: 180, size: 9 },
    optionDays:         { x: 170, y: 450, page: 0, maxWidth: 60,  size: 9 },
    optionFee:          { x: 300, y: 450, page: 0, maxWidth: 80,  size: 9 },
    titleCompany:       { x: 180, y: 390, page: 0, maxWidth: 280, size: 9 },
    closingDate:        { x: 370, y: 350, page: 0, maxWidth: 160, size: 9 },
    possession:         { x: 200, y: 330, page: 0, maxWidth: 220, size: 9 },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Third Party Financing Addendum — TREC 40-10
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_40_10: TrecFormDef = {
  id: '40-10',
  name: 'Third Party Financing Addendum',
  url: `${TREC_BASE}/40-10.pdf`,
  coords: {
    buyerNames:      { x: 88,  y: 716, page: 0, maxWidth: 420, size: 9 },
    propertyAddress: { x: 88,  y: 694, page: 0, maxWidth: 420, size: 9 },
    // Loan amounts fill into section A (Conventional) inline blanks
    loanAmount:      { x: 310, y: 572, page: 0, maxWidth: 110, size: 9 },
    loanTermYears:   { x: 468, y: 572, page: 0, maxWidth: 40,  size: 9 },
    maxInterestRate: { x: 530, y: 558, page: 0, maxWidth: 40,  size: 9 },
    loanType:        { x: 88,  y: 672, page: 0, maxWidth: 160, size: 9 },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// HOA Addendum — TREC 37-6
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_37_6: TrecFormDef = {
  id: '37-6',
  name: 'Addendum for Property Subject to Mandatory Membership in a Property Owners Association',
  url: `${TREC_BASE}/37-6.pdf`,
  coords: {
    buyerNames:           { x: 88, y: 682, page: 0, maxWidth: 220, size: 9 },
    propertyAddress:      { x: 88, y: 658, page: 0, maxWidth: 420, size: 9 },
    hoaName:              { x: 180, y: 616, page: 0, maxWidth: 300, size: 9 },
    hoaManagementCompany: { x: 220, y: 596, page: 0, maxWidth: 280, size: 9 },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Addendum for Sale of Other Property by Buyer — TREC 10-7
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_10_7: TrecFormDef = {
  id: '10-7',
  name: 'Addendum for Sale of Other Property by Buyer',
  url: `${TREC_BASE}/10-7.pdf`,
  coords: {
    buyerNames:            { x: 88, y: 682, page: 0, maxWidth: 220, size: 9 },
    propertyAddress:       { x: 88, y: 658, page: 0, maxWidth: 420, size: 9 },
    propertyToSellAddress: { x: 88, y: 616, page: 0, maxWidth: 420, size: 9 },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Lead-Based Paint Addendum — TREC OP-L
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_OP_L: TrecFormDef = {
  id: 'OP-L',
  name: "Addendum for Seller's Disclosure of Information on Lead-Based Paint",
  url: `${TREC_BASE}/OP-L.pdf`,
  coords: {
    buyerNames:      { x: 88, y: 682, page: 0, maxWidth: 220, size: 9 },
    propertyAddress: { x: 88, y: 658, page: 0, maxWidth: 420, size: 9 },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Non-Realty Items Addendum — TREC 11-8
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_11_8: TrecFormDef = {
  id: '11-8',
  name: 'Non-Realty Items Addendum',
  url: `${TREC_BASE}/11-8.pdf`,
  coords: {
    buyerNames:      { x: 88, y: 682, page: 0, maxWidth: 220, size: 9 },
    propertyAddress: { x: 88, y: 658, page: 0, maxWidth: 420, size: 9 },
    nonRealtyItems:  { x: 88, y: 616, page: 0, maxWidth: 450, size: 9 },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Buyer's Temporary Residential Lease — TREC 16-6
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_16_6: TrecFormDef = {
  id: '16-6',
  name: "Buyer's Temporary Residential Lease",
  url: `${TREC_BASE}/16-6.pdf`,
  coords: {
    buyerNames:         { x: 88, y: 682, page: 0, maxWidth: 220, size: 9 },
    propertyAddress:    { x: 88, y: 658, page: 0, maxWidth: 420, size: 9 },
    closingDate:        { x: 200, y: 616, page: 0, maxWidth: 160, size: 9 },
    buyerTempLeaseDays: { x: 420, y: 616, page: 0, maxWidth: 60,  size: 9 },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Seller's Temporary Residential Lease — TREC 15-6
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_15_6: TrecFormDef = {
  id: '15-6',
  name: "Seller's Temporary Residential Lease",
  url: `${TREC_BASE}/15-6.pdf`,
  coords: {
    buyerNames:          { x: 88, y: 682, page: 0, maxWidth: 220, size: 9 },
    propertyAddress:     { x: 88, y: 658, page: 0, maxWidth: 420, size: 9 },
    closingDate:         { x: 200, y: 616, page: 0, maxWidth: 160, size: 9 },
    sellerTempLeaseDays: { x: 420, y: 616, page: 0, maxWidth: 60,  size: 9 },
  },
}

export const ALL_FORMS = [
  FORM_20_16,
  FORM_40_10,
  FORM_37_6,
  FORM_10_7,
  FORM_OP_L,
  FORM_11_8,
  FORM_16_6,
  FORM_15_6,
]
