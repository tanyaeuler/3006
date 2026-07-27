import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'

/** Reset scroll position on navigation — SPAs do not do this for you. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
