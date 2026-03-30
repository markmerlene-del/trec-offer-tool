'use client'

import { AddendaInfo } from '@/lib/types'
import { Input, TextArea, Checkbox, Select } from '@/components/FormField'

interface Props {
  data: AddendaInfo
  onChange: (data: AddendaInfo) => void
}

export function AddendaInfoStep({ data, onChange }: Props) {
  function set<K extends keyof AddendaInfo>(key: K, value: AddendaInfo[K]) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-6">
      {/* HOA */}
      <div>
        <Checkbox
          label="Property has a mandatory HOA / Property Owners Association"
          checked={data.hasHOA}
          onChange={(e) => set('hasHOA', e.target.checked)}
        />
        {data.hasHOA && (
          <div className="mt-3 ml-7 space-y-3">
            <Input
              label="HOA Name"
              value={data.hoaName}
              onChange={(e) => set('hoaName', e.target.value)}
              placeholder="Sunset Ridge HOA"
            />
            <Input
              label="Management Company"
              value={data.hoaManagementCompany}
              onChange={(e) => set('hoaManagementCompany', e.target.value)}
              placeholder="PropertyManage Inc."
            />
          </div>
        )}
      </div>

      {/* Pre-1978 */}
      <Checkbox
        label="Property was built before 1978 (Lead-Based Paint Addendum required)"
        checked={data.builtBefore1978}
        onChange={(e) => set('builtBefore1978', e.target.checked)}
      />

      {/* Buyer has property to sell */}
      <div>
        <Checkbox
          label="Buyer has a property to sell before closing"
          checked={data.buyerHasPropertyToSell}
          onChange={(e) => set('buyerHasPropertyToSell', e.target.checked)}
        />
        {data.buyerHasPropertyToSell && (
          <div className="mt-3 ml-7">
            <Input
              label="Property to Sell Address"
              value={data.propertyToSellAddress}
              onChange={(e) => set('propertyToSellAddress', e.target.value)}
              placeholder="456 Old Home Dr, Dallas, TX 75001"
            />
          </div>
        )}
      </div>

      {/* Non-realty items */}
      <TextArea
        label="Non-Realty Items to Include"
        value={data.nonRealtyItems}
        onChange={(e) => set('nonRealtyItems', e.target.value)}
        placeholder="Refrigerator, washer, dryer, backyard playset..."
        hint="Leave blank if none. Generates Non-Realty Items Addendum."
      />

      {/* Survey */}
      <Select
        label="Survey"
        value={data.surveyType}
        onChange={(e) => set('surveyType', e.target.value as AddendaInfo['surveyType'])}
        options={[
          { value: 'existing', label: 'Use existing survey (if acceptable)' },
          { value: 'new', label: 'New survey required' },
          { value: 'none', label: 'No survey' },
        ]}
      />

      {/* Buyer temp lease */}
      <div>
        <Checkbox
          label="Buyer needs early possession (Buyer's Temporary Residential Lease)"
          checked={data.buyerTempLease}
          onChange={(e) => set('buyerTempLease', e.target.checked)}
        />
        {data.buyerTempLease && (
          <div className="mt-3 ml-7">
            <Input
              label="Number of days before closing"
              type="number"
              min="1"
              value={data.buyerTempLeaseDays}
              onChange={(e) => set('buyerTempLeaseDays', e.target.value)}
              placeholder="3"
            />
          </div>
        )}
      </div>

      {/* Seller temp lease */}
      <div>
        <Checkbox
          label="Seller needs to stay after closing (Seller's Temporary Residential Lease)"
          checked={data.sellerTempLease}
          onChange={(e) => set('sellerTempLease', e.target.checked)}
        />
        {data.sellerTempLease && (
          <div className="mt-3 ml-7">
            <Input
              label="Number of days after closing"
              type="number"
              min="1"
              value={data.sellerTempLeaseDays}
              onChange={(e) => set('sellerTempLeaseDays', e.target.value)}
              placeholder="7"
            />
          </div>
        )}
      </div>
    </div>
  )
}
