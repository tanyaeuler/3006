import { useState } from 'react'
import Button from '../ui/Button'
import { PLATFORM_URLS } from '../../lib/visibility'

const PLATFORM_CONFIG = {
  google: {
    name: 'Google Business Profile',
    color: 'blue',
    logo: (
      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl font-bold text-blue-600 border border-blue-100">G</div>
    ),
    checklist: [
      'Make sure your address, phone, and hours are correct',
      'Add at least 5 photos of your work or business',
      'Respond to every review — even a quick "thanks" helps',
    ],
    manageLabel: 'Manage on Google',
  },
  apple: {
    name: 'Apple Maps',
    color: 'gray',
    logo: (
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#374151"/>
        </svg>
      </div>
    ),
    checklist: [
      'Claim your listing through Apple Business Connect',
      'Add your correct address and phone number',
      'Upload a cover photo so your listing stands out',
    ],
    manageLabel: 'Manage on Apple Maps',
  },
  bing: {
    name: 'Bing Places',
    color: 'teal',
    logo: (
      <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl font-bold text-teal-600 border border-teal-100">B</div>
    ),
    checklist: [
      'Claim or create your Bing Places listing',
      'Add your business category so you appear in the right searches',
      'Include your website URL to boost trust',
    ],
    manageLabel: 'Manage on Bing',
  },
}

const STATUS_BADGE = {
  active: { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' },
  not_setup: { bg: 'bg-red-100', text: 'text-red-700', label: 'Not set up' },
  not_sure: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Needs checking' },
}

export default function PlatformCard({ platformKey, status, onLearnMore }) {
  const config = PLATFORM_CONFIG[platformKey]
  const badge = STATUS_BADGE[status] || STATUS_BADGE.not_sure

  const storageKey = `dashboard_checklist_${platformKey}`
  const itemCount = config.checklist.length

  const [checked, setChecked] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length === itemCount) return parsed
      }
    } catch {
      // ignore parse errors or unavailable storage
    }
    return Array(itemCount).fill(false)
  })

  function toggle(i) {
    setChecked(prev => {
      const next = prev.map((v, idx) => (idx === i ? !v : v))
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        // ignore storage errors
      }
      return next
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {config.logo}
          <div>
            <div className="font-bold text-gray-900 text-base">{config.name}</div>
            <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1 ${badge.bg} ${badge.text}`}>
              {badge.label}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {config.checklist.map((item, i) => (
          <label key={i} className="flex items-start gap-2.5 cursor-pointer group">
            <div
              onClick={() => toggle(i)}
              className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all ${
                checked[i] ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'
              }`}
            >
              {checked[i] && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`text-sm leading-snug transition-colors ${checked[i] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {item}
            </span>
          </label>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <Button
          size="sm"
          onClick={() => window.open(PLATFORM_URLS[platformKey], '_blank', 'noopener')}
          className="flex-1"
        >
          {config.manageLabel} →
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onLearnMore(platformKey)}
          className="flex-1"
        >
          Setup guide
        </Button>
      </div>
    </div>
  )
}
