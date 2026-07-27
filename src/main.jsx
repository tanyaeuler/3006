import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import App from './App.jsx'
import './index.css'

// Clean URLs in production. The single-file preview build sets
// VITE_HASH_ROUTER, because a standalone HTML file has no server to rewrite
// unmatched paths back to index.html.
const app = <App />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {import.meta.env.VITE_HASH_ROUTER ? (
      <HashRouter>{app}</HashRouter>
    ) : (
      <BrowserRouter>{app}</BrowserRouter>
    )}
  </StrictMode>,
)
