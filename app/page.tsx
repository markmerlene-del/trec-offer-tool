'use client'

import { useState } from 'react'
import { OfferFormData } from '@/lib/types'
import { BuyerInfoStep } from '@/components/steps/BuyerInfo'
import { PropertyInfoStep } from '@/components/steps/PropertyInfo'
import { PurchaseTermsStep } from '@/components/steps/PurchaseTerms'
import { FinancingInfoStep } from '@/components/steps/FinancingInfo'
import { ClosingInfoStep } from '@/components/steps/ClosingInfo'
import { AddendaInfoStep } from '@/components/steps/AddendaInfo'
import { ReviewStep } from '@/components/steps/Review'

const STEPS = [
  'Buyer Info',
  'Property',
  'Purchase Terms',
  'Financing',
  'Closing',
  'Addenda',
  'Review & Generate',
]

const DEFAULT_DATA: OfferFormData = {
  buyer: {
    buyer1FirstName: '',
    buyer1LastName: '',
    buyer2FirstName: '',
    buyer2LastName: '',
    phone: '',
    email: '',
  },
  property: {
    streetAddress: '',
    city: '',
    county: '',
    state: 'TX',
    zip: '',
    lot: '',
    block: '',
    subdivision: '',
    mlsNumber: '',
  },
  terms: {
    salesPrice: '',
    earnestMoney: '',
    earnestMoneyHolder: '',
    optionDays: '10',
    optionFee: '',
  },
  financing: {
    paymentType: 'third-party',
    loanType: 'conventional',
    loanAmount: '',
    maxInterestRate: '',
    loanTermYears: '30',
    loanOtherDescription: '',
  },
  closing: {
    closingDate: '',
    possessionAtClosing: true,
    possessionDaysAfterClosing: '',
    titleCompanyName: '',
    titleCompanyAddress: '',
    titleCompanyCity: '',
    titleCompanyState: 'TX',
    titleCompanyZip: '',
  },
  addenda: {
    hasHOA: false,
    hoaName: '',
    hoaManagementCompany: '',
    builtBefore1978: false,
    buyerHasPropertyToSell: false,
    propertyToSellAddress: '',
    nonRealtyItems: '',
    surveyType: 'existing',
    buyerTempLease: false,
    buyerTempLeaseDays: '',
    sellerTempLease: false,
    sellerTempLeaseDays: '',
  },
}

export default function Home() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<OfferFormData>(DEFAULT_DATA)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function generate() {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await fetch('/api/generate-forms?debug=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || `Server error ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'TREC-Offer-Package.zip'
      a.click()
      URL.revokeObjectURL(url)
      setSuccess(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function startOver() {
    setData(DEFAULT_DATA)
    setStep(0)
    setSuccess(false)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">TX</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">TREC Offer Generator</h1>
            <p className="text-xs text-gray-500">Texas Real Estate Commission Forms</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => i < step && setStep(i)}
                className={`text-xs font-medium px-1 text-center transition-colors ${
                  i === step
                    ? 'text-blue-700'
                    : i < step
                    ? 'text-gray-500 cursor-pointer hover:text-blue-600'
                    : 'text-gray-300 cursor-default'
                }`}
                style={{ width: `${100 / STEPS.length}%` }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-700 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{STEPS[step]}</h2>

          {step === 0 && (
            <BuyerInfoStep
              data={data.buyer}
              onChange={(buyer) => setData({ ...data, buyer })}
            />
          )}
          {step === 1 && (
            <PropertyInfoStep
              data={data.property}
              onChange={(property) => setData({ ...data, property })}
            />
          )}
          {step === 2 && (
            <PurchaseTermsStep
              data={data.terms}
              onChange={(terms) => setData({ ...data, terms })}
            />
          )}
          {step === 3 && (
            <FinancingInfoStep
              data={data.financing}
              onChange={(financing) => setData({ ...data, financing })}
            />
          )}
          {step === 4 && (
            <ClosingInfoStep
              data={data.closing}
              onChange={(closing) => setData({ ...data, closing })}
            />
          )}
          {step === 5 && (
            <AddendaInfoStep
              data={data.addenda}
              onChange={(addenda) => setData({ ...data, addenda })}
            />
          )}
          {step === 6 && <ReviewStep data={data} />}

          {/* Error / success */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              Forms downloaded successfully! Check your Downloads folder.
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-4 border-t">
            <button
              onClick={step === 0 ? startOver : () => setStep(step - 1)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              {step === 0 ? 'Clear Form' : '← Back'}
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={generate}
                disabled={loading}
                className="px-6 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate TREC Forms'}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Forms pulled directly from trec.texas.gov — always current. Not legal advice.
        </p>
      </main>
    </div>
  )
}
