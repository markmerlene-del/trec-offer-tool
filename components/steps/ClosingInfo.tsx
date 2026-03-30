'use client'

import { ClosingInfo } from '@/lib/types'
import { Input, Checkbox } from '@/components/FormField'

interface Props {
  data: ClosingInfo
  onChange: (data: ClosingInfo) => void
}

export function ClosingInfoStep({ data, onChange }: Props) {
  function set<K extends keyof ClosingInfo>(key: K, value: ClosingInfo[K]) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-4">
      <Input
        label="Closing Date"
        required
        type="date"
        value={data.closingDate}
        onChange={(e) => set('closingDate', e.target.value)}
      />

      <div className="border-t pt-4 space-y-3">
        <p className="text-sm font-semibold text-gray-700">Possession</p>
        <Checkbox
          label="Possession at closing"
          checked={data.possessionAtClosing}
          onChange={(e) => set('possessionAtClosing', e.target.checked)}
        />
        {!data.possessionAtClosing && (
          <Input
            label="Days after closing"
            type="number"
            min="0"
            value={data.possessionDaysAfterClosing}
            onChange={(e) => set('possessionDaysAfterClosing', e.target.value)}
            placeholder="0"
          />
        )}
      </div>

      <div className="border-t pt-4 space-y-3">
        <p className="text-sm font-semibold text-gray-700">Title Company</p>
        <Input
          label="Title Company Name"
          required
          value={data.titleCompanyName}
          onChange={(e) => set('titleCompanyName', e.target.value)}
          placeholder="ABC Title Company"
        />
        <Input
          label="Address"
          value={data.titleCompanyAddress}
          onChange={(e) => set('titleCompanyAddress', e.target.value)}
          placeholder="123 Title St"
        />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Input
              label="City"
              value={data.titleCompanyCity}
              onChange={(e) => set('titleCompanyCity', e.target.value)}
              placeholder="Austin"
            />
          </div>
          <Input
            label="ZIP"
            value={data.titleCompanyZip}
            onChange={(e) => set('titleCompanyZip', e.target.value)}
            placeholder="78701"
          />
        </div>
      </div>
    </div>
  )
}
