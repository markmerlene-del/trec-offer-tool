'use client'

import { PurchaseTerms } from '@/lib/types'
import { Input } from '@/components/FormField'

interface Props {
  data: PurchaseTerms
  onChange: (data: PurchaseTerms) => void
}

export function PurchaseTermsStep({ data, onChange }: Props) {
  function set<K extends keyof PurchaseTerms>(key: K, value: PurchaseTerms[K]) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Input
        label="Sales Price ($)"
        required
        type="text"
        value={data.salesPrice}
        onChange={(e) => set('salesPrice', e.target.value)}
        placeholder="350000"
        hint="Enter numbers only, no commas"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Earnest Money ($)"
          required
          value={data.earnestMoney}
          onChange={(e) => set('earnestMoney', e.target.value)}
          placeholder="5000"
        />
        <Input
          label="Earnest Money Holder"
          required
          value={data.earnestMoneyHolder}
          onChange={(e) => set('earnestMoneyHolder', e.target.value)}
          placeholder="Title company name"
        />
      </div>

      <div className="border-t pt-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Option Period</p>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Option Period (days)"
            required
            type="number"
            min="0"
            value={data.optionDays}
            onChange={(e) => set('optionDays', e.target.value)}
            placeholder="10"
          />
          <Input
            label="Option Fee ($)"
            required
            value={data.optionFee}
            onChange={(e) => set('optionFee', e.target.value)}
            placeholder="100"
          />
        </div>
      </div>
    </div>
  )
}
