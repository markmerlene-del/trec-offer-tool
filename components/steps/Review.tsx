'use client'

import { OfferFormData } from '@/lib/types'

interface Props {
  data: OfferFormData
}

export function ReviewStep({ data }: Props) {
  const { buyer, property, terms, financing, closing, addenda } = data

  const forms: string[] = ['One to Four Family Residential Contract (TREC 20-16)']
  if (financing.paymentType === 'third-party') forms.push('Third Party Financing Addendum (TREC 40-10)')
  if (addenda.hasHOA) forms.push('HOA / POA Addendum (TREC 37-6)')
  if (addenda.buyerHasPropertyToSell) forms.push('Sale of Other Property Addendum (TREC 10-7)')
  if (addenda.builtBefore1978) forms.push('Lead-Based Paint Addendum (TREC OP-L)')
  if (addenda.nonRealtyItems.trim()) forms.push('Non-Realty Items Addendum (TREC 11-8)')
  if (addenda.buyerTempLease) forms.push("Buyer's Temporary Residential Lease (TREC 16-6)")
  if (addenda.sellerTempLease) forms.push("Seller's Temporary Residential Lease (TREC 15-6)")

  return (
    <div className="space-y-6 text-sm">
      <Section title="Buyer">
        <Row label="Name">
          {[buyer.buyer1FirstName, buyer.buyer1LastName].join(' ')}
          {buyer.buyer2FirstName && ` and ${[buyer.buyer2FirstName, buyer.buyer2LastName].join(' ')}`}
        </Row>
        <Row label="Contact">{buyer.email} · {buyer.phone}</Row>
      </Section>

      <Section title="Property">
        <Row label="Address">{property.streetAddress}, {property.city}, {property.state} {property.zip}</Row>
        <Row label="County">{property.county}</Row>
        <Row label="Legal">Lot {property.lot}, Block {property.block}, {property.subdivision}</Row>
      </Section>

      <Section title="Purchase Terms">
        <Row label="Sales Price">${Number(terms.salesPrice.replace(/,/g, '')).toLocaleString()}</Row>
        <Row label="Earnest Money">${terms.earnestMoney} held by {terms.earnestMoneyHolder}</Row>
        <Row label="Option Period">{terms.optionDays} days / ${terms.optionFee}</Row>
      </Section>

      <Section title="Financing">
        <Row label="Type">
          {financing.paymentType === 'cash' ? 'Cash' : financing.paymentType === 'third-party' ? 'Third Party Financing' : 'Assumption'}
        </Row>
        {financing.paymentType === 'third-party' && (
          <>
            <Row label="Loan">{financing.loanType.toUpperCase()} · ${financing.loanAmount}</Row>
            <Row label="Terms">{financing.loanTermYears} years · max {financing.maxInterestRate}%</Row>
          </>
        )}
      </Section>

      <Section title="Closing">
        <Row label="Closing Date">{closing.closingDate}</Row>
        <Row label="Possession">{closing.possessionAtClosing ? 'At closing' : `${closing.possessionDaysAfterClosing} days after closing`}</Row>
        <Row label="Title Company">{closing.titleCompanyName}</Row>
      </Section>

      <Section title="Forms to Generate">
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {forms.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 border-b pb-1 mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-500 w-28 shrink-0">{label}</span>
      <span className="text-gray-800">{children}</span>
    </div>
  )
}
