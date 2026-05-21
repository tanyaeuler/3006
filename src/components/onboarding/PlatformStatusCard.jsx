const STATUS_RESULT = {
  active: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    label: 'Active',
    description: "Great — you're already on this platform. Head there to make sure your details are accurate and up to date.",
  },
  not_setup: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    label: 'Not set up',
    description: "No worries — creating a listing is free and only takes a few minutes. We'll show you exactly how.",
  },
  not_sure: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Needs checking',
    description: "That's fine — we'll add this to your action list so you can check and claim it when you're ready.",
  },
}

const OPTIONS = [
  {
    value: 'active',
    label: 'Yes, I have this set up',
    border: 'border-green-300',
    bg: 'bg-green-50 hover:bg-green-100',
    text: 'text-green-800',
    check: 'bg-green-500',
  },
  {
    value: 'not_setup',
    label: 'No, I need to create it',
    border: 'border-red-300',
    bg: 'bg-red-50 hover:bg-red-100',
    text: 'text-red-800',
    check: 'bg-red-500',
  },
  {
    value: 'not_sure',
    label: "Not sure",
    border: 'border-yellow-300',
    bg: 'bg-yellow-50 hover:bg-yellow-100',
    text: 'text-yellow-800',
    check: 'bg-yellow-500',
  },
]

const PLATFORM_LOGOS = {
  Google: (
    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm text-lg font-bold text-blue-600 flex-shrink-0">G</div>
  ),
  'Apple Maps': (
    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm flex-shrink-0">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#555"/>
      </svg>
    </div>
  ),
  Bing: (
    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm text-lg font-bold text-teal-600 flex-shrink-0">B</div>
  ),
}

export default function PlatformStatusCard({ platform, status, onChange }) {
  // Answered state — show result with option to change
  if (status) {
    const config = STATUS_RESULT[status]
    return (
      <div className={`rounded-2xl border-2 p-5 transition-all ${config.bg} ${config.border}`}>
        <div className="flex items-start gap-4">
          {PLATFORM_LOGOS[platform]}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-bold text-gray-900">{platform}</span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${config.badge}`}>
                {config.icon}
                {config.label}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{config.description}</p>
            <button
              onClick={() => onChange(null)}
              className="text-xs text-gray-400 hover:text-gray-600 mt-2 underline underline-offset-2 transition-colors"
            >
              Change my answer
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Unanswered state — show the question with 3 options
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white p-5">
      <div className="flex items-center gap-3 mb-4">
        {PLATFORM_LOGOS[platform]}
        <div>
          <div className="font-bold text-gray-900">{platform}</div>
          <div className="text-sm text-gray-500 mt-0.5">Do you already have a listing here?</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all cursor-pointer ${opt.border} ${opt.bg} ${opt.text}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
