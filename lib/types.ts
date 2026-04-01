export interface BuyerInfo {
  buyer1FirstName: string
  buyer1LastName: string
  buyer2FirstName: string
  buyer2LastName: string
  phone: string
  email: string
}

export interface PropertyInfo {
  streetAddress: string
  city: string
  county: string
  state: string
  zip: string
  lot: string
  block: string
  subdivision: string
  mlsNumber: string
}

export interface PurchaseTerms {
  salesPrice: string
  earnestMoney: string
  earnestMoneyHolder: string
  optionDays: string
  optionFee: string
}

export type PaymentType = 'cash' | 'third-party' | 'assumption'
export type LoanType = 'conventional' | 'fha' | 'va' | 'usda' | 'other'

export interface FinancingInfo {
  paymentType: PaymentType
  loanType: LoanType
  loanAmount: string
  maxInterestRate: string
  loanTermYears: string
  loanOtherDescription: string
}

export interface ClosingInfo {
  closingDate: string
  possessionAtClosing: boolean
  possessionDaysAfterClosing: string
  titleCompanyName: string
  titleCompanyAddress: string
  titleCompanyCity: string
  titleCompanyState: string
  titleCompanyZip: string
}

export interface AddendaInfo {
  hasHOA: boolean
  hoaName: string
  hoaManagementCompany: string
  builtBefore1978: boolean
  buyerHasPropertyToSell: boolean
  propertyToSellAddress: string
  nonRealtyItems: string
  surveyType: 'existing' | 'new' | 'none'
  buyerTempLease: boolean
  buyerTempLeaseDays: string
  sellerTempLease: boolean
  sellerTempLeaseDays: string
}

export interface OfferFormData {
  buyer: BuyerInfo
  property: PropertyInfo
  terms: PurchaseTerms
  financing: FinancingInfo
  closing: ClosingInfo
  addenda: AddendaInfo
}
