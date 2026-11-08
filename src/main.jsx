import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Hash routes are only known in the browser; the static document is the home page.
if (root.hasChildNodes() && (!window.location.hash || window.location.hash === '#')) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
