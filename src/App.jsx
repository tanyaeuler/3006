import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import GuidancePage from './components/guidance/GuidancePage'
import CamperBookingPage from './pages/CamperBookingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BusinessApp />} />
        <Route path="/booking" element={<CamperBookingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function BusinessApp() {
  const [screen, setScreen] = useState('onboarding') // 'onboarding' | 'dashboard' | 'guidance'
  const [business, setBusiness] = useState(null)
  const [platformStatuses, setPlatformStatuses] = useState(null)
  const [guidancePlatform, setGuidancePlatform] = useState(null)

  function handleOnboardingComplete(biz, statuses) {
    setBusiness(biz)
    setPlatformStatuses(statuses)
    setScreen('dashboard')
  }

  function handleLearnMore(platformKey) {
    setGuidancePlatform(platformKey)
    setScreen('guidance')
  }

  function handleBackToDashboard() {
    setScreen('dashboard')
  }

  if (screen === 'onboarding') {
    return <OnboardingPage onComplete={handleOnboardingComplete} />
  }

  if (screen === 'guidance' && guidancePlatform) {
    return (
      <GuidancePage
        platformKey={guidancePlatform}
        onBack={handleBackToDashboard}
      />
    )
  }

  return (
    <DashboardPage
      business={business}
      platformStatuses={platformStatuses}
      onLearnMore={handleLearnMore}
    />
  )
}
