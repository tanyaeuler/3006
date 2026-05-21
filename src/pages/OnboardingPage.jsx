import { useState } from 'react'
import BusinessForm from '../components/onboarding/BusinessForm'
import ResultsScreen from '../components/onboarding/ResultsScreen'
import { saveBusiness, updateBusinessStatus } from '../lib/supabase'

export default function OnboardingPage({ onComplete }) {
  const [phase, setPhase] = useState('form') // 'form' | 'results'
  const [business, setBusiness] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)

  function handleFormComplete(values) {
    setBusiness(values)
    setPhase('results')
  }

  async function handleResultsContinue(platformStatuses) {
    setIsSaving(true)
    setSaveError(null)
    try {
      const saved = await saveBusiness({
        name: business.name,
        address: business.address,
        phone: business.phone,
        website: business.website,
        platform_statuses: platformStatuses,
      })
      onComplete({ ...business, id: saved.id }, platformStatuses)
    } catch (err) {
      // If Supabase isn't configured, continue with in-memory data
      console.warn('Supabase save failed (expected in demo):', err.message)
      onComplete({ ...business, id: 'local-' + Date.now() }, platformStatuses)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="px-4 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-2 mb-6">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-sm">Local Business Command Centre</span>
        </div>

        {phase === 'form' && (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Get found by more customers
            </h1>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              We'll check your business on Google, Apple Maps, and Bing — and show you exactly what to fix.
            </p>
          </>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8">
          {phase === 'form' ? (
            <BusinessForm onComplete={handleFormComplete} />
          ) : (
            <ResultsScreen
              business={business}
              onContinue={handleResultsContinue}
              isSaving={isSaving}
            />
          )}
          {saveError && (
            <div className="mt-4 text-sm text-red-600 text-center">{saveError}</div>
          )}
        </div>
      </main>

      <footer className="text-center text-xs text-gray-400 pb-6">
        Free to use · No account needed
      </footer>
    </div>
  )
}
