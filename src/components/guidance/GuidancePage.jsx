import { useState } from 'react'
import Button from '../ui/Button'
import { PLATFORM_URLS } from '../../lib/visibility'

const GUIDANCE_CONTENT = {
  google: {
    name: 'Google Business Profile',
    tagline: 'The most important place to be listed online',
    color: 'blue',
    logo: <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">G</div>,
    why: "When someone searches for a plumber, electrician, or any tradie near them, Google is usually the first place they look. Your Google Business Profile is the box that shows up on the right side of Google Search and on Google Maps. Getting this right means more calls, more bookings, and customers finding you instead of your competition.",
    aiNote: "AI tools like Google's own Gemini and other AI assistants now pull business info directly from Google Business Profiles. If you're not listed — or your info is wrong — AI assistants will either skip your business or give customers the wrong details.",
    steps: [
      { id: 's1', text: 'Go to business.google.com and sign in with your Google account' },
      { id: 's2', text: 'Search for your business name — it might already be listed' },
      { id: 's3', text: 'Click "Claim this business" or "Add your business to Google"' },
      { id: 's4', text: 'Fill in your business name, category (e.g. "Electrician"), and address' },
      { id: 's5', text: 'Add your phone number and website' },
      { id: 's6', text: 'Verify your listing — Google usually sends a postcard or lets you verify by phone' },
      { id: 's7', text: 'Once verified, add at least 5 photos of your work, vehicle, or team' },
      { id: 's8', text: 'Set your trading hours so customers know when to call' },
      { id: 's9', text: 'Write a short business description in plain English — what you do and where you work' },
      { id: 's10', text: 'Ask a couple of happy customers to leave you a review — even 3 or 4 makes a big difference' },
    ],
    url: PLATFORM_URLS.google,
    buttonLabel: 'Go to Google Business Profile',
  },
  apple: {
    name: 'Apple Maps',
    tagline: "Don't miss out on iPhone users",
    color: 'gray',
    logo: (
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200">
        <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#374151"/>
        </svg>
      </div>
    ),
    why: "Over half of Australian smartphone users have an iPhone. When they ask Siri 'find a plumber near me' or open Maps to search, Apple Maps is what they're using. If your business isn't listed there, you're invisible to those customers — even if your Google listing is perfect.",
    aiNote: "Apple's Siri and other AI assistants on Apple devices pull location data from Apple Maps. A complete Apple Maps listing means Siri can recommend you when someone asks for a tradie nearby.",
    steps: [
      { id: 's1', text: 'Go to mapsconnect.apple.com (you\'ll need an Apple ID)' },
      { id: 's2', text: 'Search for your business — it might already exist from Apple\'s own data' },
      { id: 's3', text: 'Click "Claim" if it exists, or "Add New Place" if it doesn\'t' },
      { id: 's4', text: 'Fill in your business name, address, and phone number' },
      { id: 's5', text: 'Select the right business category — this helps you show up in the right searches' },
      { id: 's6', text: 'Add your website URL' },
      { id: 's7', text: 'Upload a photo — a professional-looking logo or a photo of your work' },
      { id: 's8', text: 'Add your trading hours' },
      { id: 's9', text: 'Submit and wait for Apple to review — usually takes a few days' },
    ],
    url: PLATFORM_URLS.apple,
    buttonLabel: 'Go to Apple Business Connect',
  },
  bing: {
    name: 'Bing Places',
    tagline: 'Reach customers on Windows, Cortana, and AI search',
    color: 'teal',
    logo: <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center text-3xl font-bold text-teal-600">B</div>,
    why: "Bing powers search on millions of Windows computers and is the backbone of Microsoft's Copilot AI. It's the second-biggest search engine in Australia. If a customer is on a work PC or uses Microsoft Edge, Bing is likely what they're searching on. Getting listed on Bing Places is quick, free, and often gets overlooked by other tradies — giving you an advantage.",
    aiNote: "Microsoft Copilot and ChatGPT (which uses Bing for web search) both pull local business information from Bing. A Bing Places listing means AI tools can find and recommend you when customers ask for local services.",
    steps: [
      { id: 's1', text: 'Go to bingplaces.com and sign in with a Microsoft account (you can create one free)' },
      { id: 's2', text: 'Click "Get Started" and search for your business name' },
      { id: 's3', text: 'If found, click "Claim business" — otherwise click "Add new business"' },
      { id: 's4', text: 'Fill in your business name, address, phone, and category' },
      { id: 's5', text: 'Add your website URL' },
      { id: 's6', text: 'Set your business hours' },
      { id: 's7', text: 'Add a description of what you do and where you work' },
      { id: 's8', text: 'Upload a photo if you have one' },
      { id: 's9', text: 'Verify your listing via phone or email' },
    ],
    url: PLATFORM_URLS.bing,
    buttonLabel: 'Go to Bing Places',
  },
}

export default function GuidancePage({ platformKey, onBack }) {
  const content = GUIDANCE_CONTENT[platformKey]
  const [checked, setChecked] = useState(() => new Set())

  function toggle(id) {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const progress = Math.round((checked.size / content.steps.length) * 100)

  if (!content) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 font-medium mb-6 hover:text-blue-700 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to dashboard
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
        <div className="flex items-center gap-4 mb-4">
          {content.logo}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{content.name}</h1>
            <p className="text-gray-500 font-medium">{content.tagline}</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{content.why}</p>
      </div>

      {/* AI Note */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-5">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-blue-900 text-sm mb-1">Why this matters for AI search</div>
            <p className="text-blue-800 text-sm leading-relaxed">{content.aiNote}</p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg">Step-by-step setup</h3>
          <span className="text-sm text-gray-500">{checked.size}/{content.steps.length} done</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-3">
          {content.steps.map((step, i) => {
            const done = checked.has(step.id)
            return (
              <label key={step.id} className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => toggle(step.id)}
                  className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-md border-2 flex items-center justify-center transition-all ${
                    done ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'
                  }`}
                >
                  {done && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex items-start gap-2 flex-1">
                  <span className={`text-xs font-bold mt-0.5 flex-shrink-0 ${done ? 'text-blue-400' : 'text-gray-400'}`}>
                    {i + 1}.
                  </span>
                  <span className={`text-sm leading-relaxed ${done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {step.text}
                  </span>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={() => window.open(content.url, '_blank', 'noopener')}
      >
        {content.buttonLabel} →
      </Button>
    </div>
  )
}
