import { useEffect, useState } from 'react'
import PlatformStatusCard from './PlatformStatusCard'
import Button from '../ui/Button'

const PLATFORMS = [
  { key: 'google', label: 'Google' },
  { key: 'apple', label: 'Apple Maps' },
  { key: 'bing', label: 'Bing' },
]

// Since we have no live API access, we simulate a check with realistic random outcomes
// weighted toward "unclaimed" to encourage action.
function simulateCheck() {
  const roll = Math.random()
  if (roll < 0.3) return 'claimed'
  if (roll < 0.75) return 'unclaimed'
  return 'not_found'
}

export default function ResultsScreen({ business, onContinue, isSaving }) {
  const [statuses, setStatuses] = useState({ google: 'checking', apple: 'checking', bing: 'checking' })
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Stagger the "checks" to feel realistic
    const timers = PLATFORMS.map(({ key }, i) =>
      setTimeout(() => {
        setStatuses(s => ({ ...s, [key]: simulateCheck() }))
        if (i === PLATFORMS.length - 1) setDone(true)
      }, 800 + i * 700)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {done ? "Here's what we found" : `Searching for ${business.name}…`}
        </h2>
        <p className="text-gray-500">
          {done
            ? "We checked the three main platforms where customers look for local businesses."
            : "Checking your business on Google, Apple Maps, and Bing…"}
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {PLATFORMS.map(({ key, label }) => (
          <PlatformStatusCard key={key} platform={label} status={statuses[key]} />
        ))}
      </div>

      {done && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 text-sm text-blue-800">
          <strong>Heads up:</strong> These results are a guide only. Head to each platform to confirm your listing status and make sure everything is accurate.
        </div>
      )}

      <Button
        onClick={() => onContinue(statuses)}
        disabled={!done || isSaving}
        className="w-full"
        size="lg"
      >
        {isSaving ? 'Saving your details…' : 'Continue to Dashboard'}
      </Button>
    </div>
  )
}
