import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/shrikhand/400.css'
import '@fontsource/archivo/latin-500.css'
import '@fontsource/archivo/latin-600.css'
import '@fontsource/archivo/latin-700.css'
import '@fontsource/archivo/latin-800.css'
import '@fontsource/kalam/latin-400.css'
import '@fontsource/zen-antique/400.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
