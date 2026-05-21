import { calcVisibilityScore, getScoreLabel, getPriorityActions } from '../../lib/visibility'

function ScoreRing({ score }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color = score >= 80 ? '#16a34a' : score >= 50 ? '#ca8a04' : '#dc2626'

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{score}</span>
        <span className="text-xs text-gray-500 font-medium">out of 100</span>
      </div>
    </div>
  )
}

export default function VisibilityScore({ business, platformStatuses }) {
  const score = calcVisibilityScore(business, platformStatuses)
  const { label, color } = getScoreLabel(score)
  const actions = getPriorityActions(business, platformStatuses)

  const explanation =
    score >= 80
      ? "You're doing well! Your business is visible on the main platforms and your details look complete. Keep your listings fresh with photos and respond to reviews."
      : score >= 50
      ? "You're on the right track, but there are a few things that could help more customers find you. Work through the action list below to improve your score."
      : "Your business isn't easy to find online yet. That's OK — follow the steps below and you'll see a big improvement quickly."

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-5">Your Visibility Score</h3>

      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        <ScoreRing score={score} />
        <div className="text-center sm:text-left">
          <div className={`text-2xl font-bold mb-1 ${color}`}>{label}</div>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{explanation}</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
          What to do next
        </h4>
        <ol className="space-y-2">
          {actions.map((action, i) => (
            <li key={action.id} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {action.text}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
