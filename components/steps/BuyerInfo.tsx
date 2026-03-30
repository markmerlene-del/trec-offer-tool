'use client'

import { BuyerInfo } from '@/lib/types'
import { Input } from '@/components/FormField'

interface Props {
  data: BuyerInfo
  onChange: (data: BuyerInfo) => void
}

export function BuyerInfoStep({ data, onChange }: Props) {
  function set<K extends keyof BuyerInfo>(key: K, value: BuyerInfo[K]) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Buyer 1</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            required
            value={data.buyer1FirstName}
            onChange={(e) => set('buyer1FirstName', e.target.value)}
            placeholder="John"
          />
          <Input
            label="Last Name"
            required
            value={data.buyer1LastName}
            onChange={(e) => set('buyer1LastName', e.target.value)}
            placeholder="Smith"
          />
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Buyer 2 (optional)</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={data.buyer2FirstName}
            onChange={(e) => set('buyer2FirstName', e.target.value)}
            placeholder="Jane"
          />
          <Input
            label="Last Name"
            value={data.buyer2LastName}
            onChange={(e) => set('buyer2LastName', e.target.value)}
            placeholder="Smith"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Phone"
          required
          type="tel"
          value={data.phone}
          onChange={(e) => set('phone', e.target.value)}
          placeholder="(555) 555-5555"
        />
        <Input
          label="Email"
          required
          type="email"
          value={data.email}
          onChange={(e) => set('email', e.target.value)}
          placeholder="buyer@email.com"
        />
      </div>
    </div>
  )
}
