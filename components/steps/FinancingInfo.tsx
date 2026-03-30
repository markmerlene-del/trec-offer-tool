'use client'

import { FinancingInfo, LoanType, PaymentType } from '@/lib/types'
import { Input, Select } from '@/components/FormField'

interface Props {
  data: FinancingInfo
  onChange: (data: FinancingInfo) => void
}

export function FinancingInfoStep({ data, onChange }: Props) {
  function set<K extends keyof FinancingInfo>(key: K, value: FinancingInfo[K]) {
    onChange({ ...data, [key]: value })
  }

  const paymentOptions: { value: PaymentType; label: string }[] = [
    { value: 'cash', label: 'Cash' },
    { value: 'third-party', label: 'Third Party Financing (Loan)' },
    { value: 'assumption', label: 'Assumption' },
  ]

  const loanTypeOptions: { value: LoanType; label: string }[] = [
    { value: 'conventional', label: 'Conventional' },
    { value: 'fha', label: 'FHA' },
    { value: 'va', label: 'VA' },
    { value: 'usda', label: 'USDA' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <div className="space-y-4">
      <Select
        label="Payment Type"
        required
        value={data.paymentType}
        onChange={(e) => set('paymentType', e.target.value as PaymentType)}
        options={paymentOptions}
      />

      {data.paymentType === 'third-party' && (
        <div className="space-y-4 border-t pt-4">
          <p className="text-sm font-semibold text-gray-700">Loan Details</p>

          <Select
            label="Loan Type"
            required
            value={data.loanType}
            onChange={(e) => set('loanType', e.target.value as LoanType)}
            options={loanTypeOptions}
          />

          {data.loanType === 'other' && (
            <Input
              label="Describe Loan Type"
              value={data.loanOtherDescription}
              onChange={(e) => set('loanOtherDescription', e.target.value)}
              placeholder="e.g. Bridge Loan"
            />
          )}

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Loan Amount ($)"
              required
              value={data.loanAmount}
              onChange={(e) => set('loanAmount', e.target.value)}
              placeholder="280000"
            />
            <Input
              label="Max Interest Rate (%)"
              required
              type="number"
              step="0.125"
              value={data.maxInterestRate}
              onChange={(e) => set('maxInterestRate', e.target.value)}
              placeholder="7.5"
            />
            <Input
              label="Loan Term (years)"
              required
              type="number"
              value={data.loanTermYears}
              onChange={(e) => set('loanTermYears', e.target.value)}
              placeholder="30"
            />
          </div>
        </div>
      )}
    </div>
  )
}
