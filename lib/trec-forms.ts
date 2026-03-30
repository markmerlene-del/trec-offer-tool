// TREC form definitions — URLs point to the live TREC website so forms are always current.
// Field names were derived by inspecting the fillable PDF form fields.

export interface TrecFormDef {
  id: string
  name: string
  url: string
  // Maps our intake field keys → PDF field names inside the form
  fieldMap: Record<string, string>
}

export const TREC_BASE = 'https://www.trec.texas.gov/sites/default/files/pdf-forms'

// ─────────────────────────────────────────────────────────────────────────────
// One to Four Family Residential Contract (Resale) — TREC 20-16
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_20_16: TrecFormDef = {
  id: '20-16',
  name: 'One to Four Family Residential Contract (Resale)',
  url: `${TREC_BASE}/20-16.pdf`,
  fieldMap: {
    // Buyers
    buyer1Name: 'Buyer 1 Name',
    buyer2Name: 'Buyer 2 Name',
    // Property
    propertyAddress: 'Property Address',
    city: 'City',
    county: 'County',
    legalDescription: 'Legal Description',
    // Price
    salesPrice: 'Sales Price',
    cashPortion: 'Cash Portion',
    loanAmount: 'Loan Amount',
    // Earnest money
    earnestMoney: 'Earnest Money',
    earnestMoneyHolder: 'Earnest Money Holder',
    // Option
    optionFee: 'Option Fee',
    optionDays: 'Option Days',
    // Title
    titleCompany: 'Title Company',
    // Closing
    closingDate: 'Closing Date',
    // Possession
    possession: 'Possession',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Third Party Financing Addendum — TREC 40-10
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_40_10: TrecFormDef = {
  id: '40-10',
  name: 'Third Party Financing Addendum',
  url: `${TREC_BASE}/40-10.pdf`,
  fieldMap: {
    buyer1Name: 'Buyer Name',
    propertyAddress: 'Property Address',
    loanAmount: 'Loan Amount',
    maxInterestRate: 'Maximum Interest Rate',
    loanTermYears: 'Loan Term Years',
    loanType: 'Loan Type',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// HOA Addendum — TREC 37-6
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_37_6: TrecFormDef = {
  id: '37-6',
  name: 'Addendum for Property Subject to Mandatory Membership in a Property Owners Association',
  url: `${TREC_BASE}/37-6.pdf`,
  fieldMap: {
    buyer1Name: 'Buyer',
    propertyAddress: 'Property Address',
    hoaName: 'Association Name',
    hoaManagementCompany: 'Management Company',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Addendum for Sale of Other Property by Buyer — TREC 10-7
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_10_7: TrecFormDef = {
  id: '10-7',
  name: 'Addendum for Sale of Other Property by Buyer',
  url: `${TREC_BASE}/10-7.pdf`,
  fieldMap: {
    buyer1Name: 'Buyer',
    propertyAddress: 'Contract Property Address',
    propertyToSellAddress: 'Property to Sell Address',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Lead-Based Paint Addendum — TREC OP-L (homes built before 1978)
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_OP_L: TrecFormDef = {
  id: 'OP-L',
  name: "Addendum for Seller's Disclosure of Information on Lead-Based Paint",
  url: `${TREC_BASE}/OP-L.pdf`,
  fieldMap: {
    buyer1Name: 'Buyer',
    propertyAddress: 'Property Address',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Non-Realty Items Addendum — TREC 11-8
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_11_8: TrecFormDef = {
  id: '11-8',
  name: 'Non-Realty Items Addendum',
  url: `${TREC_BASE}/11-8.pdf`,
  fieldMap: {
    buyer1Name: 'Buyer',
    propertyAddress: 'Property Address',
    nonRealtyItems: 'Non-Realty Items',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Buyer's Temporary Residential Lease — TREC 16-6
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_16_6: TrecFormDef = {
  id: '16-6',
  name: "Buyer's Temporary Residential Lease",
  url: `${TREC_BASE}/16-6.pdf`,
  fieldMap: {
    buyer1Name: 'Landlord (Seller)',
    propertyAddress: 'Property Address',
    closingDate: 'Lease Date',
    buyerTempLeaseDays: 'Lease Days',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Seller's Temporary Residential Lease — TREC 15-6
// ─────────────────────────────────────────────────────────────────────────────
export const FORM_15_6: TrecFormDef = {
  id: '15-6',
  name: "Seller's Temporary Residential Lease",
  url: `${TREC_BASE}/15-6.pdf`,
  fieldMap: {
    buyer1Name: 'Landlord (Buyer)',
    propertyAddress: 'Property Address',
    closingDate: 'Lease Date',
    sellerTempLeaseDays: 'Lease Days',
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
