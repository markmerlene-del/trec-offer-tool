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
    // Page 0 — Section 1: Buyer inline blank — starts after printed "(Seller) and "
    buyerNames:         { x: 168, y: 668, page: 0, maxWidth: 200, size: 9 },

    // Page 0 — Section 2A: LAND — "Lot ___, Block ___, ___ Addition, City of ___, County of ___"
    lot:                { x: 152, y: 601, page: 0, maxWidth: 30,  size: 9 },
    block:              { x: 210, y: 601, page: 0, maxWidth: 25,  size: 9 },
    subdivision:        { x: 247, y: 601, page: 0, maxWidth: 50,  size: 9 },
    city:               { x: 380, y: 601, page: 0, maxWidth: 80,  size: 9 },
    county:             { x: 487, y: 601, page: 0, maxWidth: 80,  size: 9 },
    propertyAddress:    { x: 155, y: 585, page: 0, maxWidth: 320, size: 9 },

    // Page 0 — Section 3: SALES PRICE (dollar blanks at right margin)
    cashPortion:        { x: 493, y: 306, page: 0, maxWidth: 90, size: 9 },
    loanAmount:         { x: 493, y: 280, page: 0, maxWidth: 90, size: 9 },
    salesPrice:         { x: 493, y: 260, page: 0, maxWidth: 90, size: 9 },

    // Page 1 — Section 5A: Earnest money & option fee
    // Line B: "must deliver to [holder], as escrow agent, at"
    // Line C: "(address): $[earnestMoney]"
    // Line D: "as earnest money and $[optionFee] as Option Fee"
    earnestMoneyHolder: { x: 190, y: 706, page: 1, maxWidth: 220, size: 9 },
    earnestMoney:       { x: 490, y: 692, page: 1, maxWidth: 90,  size: 9 },
    optionFee:          { x: 350, y: 678, page: 1, maxWidth: 80,  size: 9 },

    // Page 1 — Section 5B: Option period (days) — "within ___ days after Effective Date"
    optionDays:         { x: 175, y: 420, page: 1, maxWidth: 40,  size: 9 },

    // Page 1 — Section 6A: Title company — blank starts after "issued by "
    titleCompany:       { x: 348, y: 340, page: 1, maxWidth: 200, size: 9 },

    // Page 3 — Section 9: Closing date
    closingDate:        { x: 310, y: 680, page: 3, maxWidth: 120, size: 9 },

    // Page 3 — Section 10: Possession
    possession:         { x: 200, y: 590, page: 3, maxWidth: 180, size: 9 },
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
    // Buyer blank is just below the form title
    buyerNames:      { x: 88,  y: 668, page: 0, maxWidth: 420, size: 9 },
    // Address blank is below "TO CONTRACT CONCERNING THE PROPERTY AT"
    propertyAddress: { x: 88,  y: 640, page: 0, maxWidth: 420, size: 9 },
    // Loan amounts fill into section A(1) inline blanks
    loanAmount:      { x: 310, y: 572, page: 0, maxWidth: 110, size: 9 },
    loanTermYears:   { x: 468, y: 572, page: 0, maxWidth: 40,  size: 9 },
    maxInterestRate: { x: 530, y: 558, page: 0, maxWidth: 40,  size: 9 },
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
    buyerNames:      { x: 88,  y: 682, page: 0, maxWidth: 220, size: 9 },
    // "CONCERNING THE PROPERTY AT" is printed text ending ~x:300; address starts after
    propertyAddress: { x: 305, y: 668, page: 0, maxWidth: 215, size: 9 },
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
