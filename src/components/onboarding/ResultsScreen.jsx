import { useState } from 'react'
import PlatformStatusCard from './PlatformStatusCard'
import Button from '../ui/Button'

const PLATFORMS = [
  { key: 'google', label: 'Google' },
  { key: 'apple', label: 'Apple Maps' },
  { key: 'bing', label: 'Bing' },
]

export default function ResultsScreen({ business, onContinue, isSaving }) {
  const [statuses, setStatuses] = useState({ google: null, apple: null, bing: null })

  function setStatus(key, value) {
    setStatuses(s => ({ ...s, [key]: value }))
  }

  const answeredCount = PLATFORMS.filter(({ key }) => statuses[key] !== null).length
  const allAnswered = answeredCount === PLATFORMS.length

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Are you listed on these platforms?
        </h2>
        <p className="text-gray-500">
          Tell us what's already set up for <strong className="text-gray-700">{business.name}</strong>.
        </p>
      </div>

      {/* Progress indicator */}
      {!allAnswered && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(answeredCount / PLATFORMS.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0">{answeredCount} of 3</span>
        </div>
      )}

      <div className="space-y-3 mb-6">
        {PLATFORMS.map(({ key, label }) => (
          <PlatformStatusCard
            key={key}
            platform={label}
            status={statuses[key]}
            onChange={value => setStatus(key, value)}
          />
        ))}
      </div>

      {allAnswered && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 text-sm text-blue-800">
          <strong>All done!</strong> Head to your dashboard to see your visibility score and exactly what to do next.
        </div>
      )}

      <Button
        onClick={() => onContinue(statuses)}
        disabled={!allAnswered || isSaving}
        className="w-full"
        size="lg"
      >
        {isSaving ? 'Saving your details…' : 'Continue to Dashboard'}
      </Button>

      {!allAnswered && (
        <p className="text-center text-sm text-gray-400 mt-3">
          Answer all three questions above to continue.
        </p>
      )}
    </div>
  )
}
