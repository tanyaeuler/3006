import PlatformCard from '../components/dashboard/PlatformCard'
import VisibilityScore from '../components/dashboard/VisibilityScore'

export default function DashboardPage({ business, platformStatuses, onLearnMore }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-sm hidden sm:block">Local Business Command Centre</span>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-900 text-sm">{business.name}</div>
            <div className="text-xs text-gray-500 truncate max-w-40">{business.address}</div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Command Centre</h2>
          <p className="text-gray-500 mt-1">
            Here's everywhere customers can find <strong>{business.name}</strong> online.
          </p>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['google', 'apple', 'bing'].map(key => (
            <PlatformCard
              key={key}
              platformKey={key}
              status={platformStatuses?.[key] || 'unclaimed'}
              onLearnMore={onLearnMore}
            />
          ))}
        </div>

        {/* Visibility score */}
        <VisibilityScore business={business} platformStatuses={platformStatuses} />

        {/* Help nudge */}
        <div className="bg-blue-600 rounded-2xl p-5 text-white">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <div className="font-bold mb-1">Not sure where to start?</div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Click "Setup guide" on any card above for plain-English instructions written for busy tradies.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
