'use client'

import { PropertyInfo } from '@/lib/types'
import { Input } from '@/components/FormField'

interface Props {
  data: PropertyInfo
  onChange: (data: PropertyInfo) => void
}

export function PropertyInfoStep({ data, onChange }: Props) {
  function set<K extends keyof PropertyInfo>(key: K, value: PropertyInfo[K]) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Input
        label="Street Address"
        required
        value={data.streetAddress}
        onChange={(e) => set('streetAddress', e.target.value)}
        placeholder="123 Main St"
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Input
            label="City"
            required
            value={data.city}
            onChange={(e) => set('city', e.target.value)}
            placeholder="Austin"
          />
        </div>
        <Input
          label="State"
          required
          value={data.state}
          onChange={(e) => set('state', e.target.value)}
          placeholder="TX"
          maxLength={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="ZIP Code"
          required
          value={data.zip}
          onChange={(e) => set('zip', e.target.value)}
          placeholder="78701"
          maxLength={5}
        />
        <Input
          label="County"
          required
          value={data.county}
          onChange={(e) => set('county', e.target.value)}
          placeholder="Travis"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Lot"
          required
          value={data.lot}
          onChange={(e) => set('lot', e.target.value)}
          placeholder="1"
          hint="Lot number"
        />
        <Input
          label="Block"
          required
          value={data.block}
          onChange={(e) => set('block', e.target.value)}
          placeholder="A"
          hint="Block number"
        />
        <Input
          label="Subdivision"
          required
          value={data.subdivision}
          onChange={(e) => set('subdivision', e.target.value)}
          placeholder="Sunset Hills"
          hint="Subdivision/addition name"
        />
      </div>

      <Input
        label="MLS Number"
        value={data.mlsNumber}
        onChange={(e) => set('mlsNumber', e.target.value)}
        placeholder="12345678"
      />
    </div>
  )
}
