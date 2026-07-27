import { Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FaithPage from './pages/FaithPage'
import HomePage from './pages/HomePage'
import JournalPage from './pages/JournalPage'
import NotFoundPage from './pages/NotFoundPage'
import PostPage from './pages/PostPage'
import WorkPage from './pages/WorkPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="faith" element={<FaithPage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="journal/:slug" element={<PostPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
