export function calcVisibilityScore(business, platformStatuses) {
  let score = 0

  // Platform points (20 each, max 60)
  const platforms = ['google', 'apple', 'bing']
  platforms.forEach(p => {
    const s = platformStatuses?.[p]
    if (s === 'active') score += 20
    else if (s === 'not_sure') score += 5
    // 'not_setup' contributes 0
  })

  // Business info completeness (40 points total)
  if (business?.name?.trim()) score += 10
  if (business?.address?.trim()) score += 10
  if (business?.phone?.trim()) score += 10
  if (business?.website?.trim()) score += 10

  return Math.min(score, 100)
}

export function getScoreLabel(score) {
  if (score >= 80) return { label: 'Great', color: 'text-green-600' }
  if (score >= 50) return { label: 'Getting there', color: 'text-yellow-600' }
  return { label: 'Needs work', color: 'text-red-600' }
}

export function getPriorityActions(business, platformStatuses) {
  const actions = []

  const googleStatus = platformStatuses?.google
  const appleStatus = platformStatuses?.apple
  const bingStatus = platformStatuses?.bing

  if (googleStatus !== 'active') {
    const text = googleStatus === 'not_setup'
      ? 'Create your Google Business Profile — this is the single most important thing you can do to show up in search.'
      : 'Check and claim your Google Business Profile — this is the most important step for showing up in search.'
    actions.push({ id: 'google', text })
  }
  if (appleStatus !== 'active') {
    const text = appleStatus === 'not_setup'
      ? 'Create your Apple Maps listing so the millions of Australians with iPhones can find you.'
      : 'Check and claim your Apple Maps listing so iPhone users can find you easily.'
    actions.push({ id: 'apple', text })
  }
  if (bingStatus !== 'active') {
    const text = bingStatus === 'not_setup'
      ? 'Create your Bing Places listing — it also puts you in front of Microsoft Copilot and ChatGPT users.'
      : 'Check and claim your Bing Places listing to reach customers on Windows and AI search tools.'
    actions.push({ id: 'bing', text })
  }
  if (!business?.website?.trim()) {
    actions.push({ id: 'website', text: 'Add your website URL — it helps all platforms verify and rank your business.' })
  }
  if (actions.length === 0) {
    actions.push({ id: 'photos', text: 'Add photos to your listings — businesses with photos get more clicks.' })
    actions.push({ id: 'reviews', text: 'Ask happy customers to leave a Google review — reviews boost your ranking.' })
  }

  return actions.slice(0, 4)
}

export const PLATFORM_URLS = {
  google: 'https://business.google.com',
  apple: 'https://mapsconnect.apple.com',
  bing: 'https://www.bingplaces.com',
}

export const PLATFORM_SEARCH_URLS = {
  google: (name, address) =>
    `https://www.google.com/search?q=${encodeURIComponent(`${name} ${address}`)}`,
  apple: (name, address) =>
    `https://maps.apple.com/?q=${encodeURIComponent(`${name} ${address}`)}`,
  bing: (name, address) =>
    `https://www.bing.com/maps?q=${encodeURIComponent(`${name} ${address}`)}`,
}
