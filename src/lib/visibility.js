export function calcVisibilityScore(business, platformStatuses) {
  let score = 0

  // Platform claimed points (20 each, max 60)
  const platforms = ['google', 'apple', 'bing']
  platforms.forEach(p => {
    if (platformStatuses?.[p] === 'claimed') score += 20
    else if (platformStatuses?.[p] === 'unclaimed') score += 5
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

  if (platformStatuses?.google !== 'claimed') {
    actions.push({ id: 'google', text: 'Claim your Google Business Profile — this is the most important step for showing up in search.' })
  }
  if (platformStatuses?.apple !== 'claimed') {
    actions.push({ id: 'apple', text: 'Add your business to Apple Maps so iPhone users can find you easily.' })
  }
  if (platformStatuses?.bing !== 'claimed') {
    actions.push({ id: 'bing', text: 'Claim your Bing Places listing to reach more customers using Windows and Cortana.' })
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
