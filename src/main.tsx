import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { I18nProvider } from './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <Toaster />
      <App />
    </I18nProvider>
  </StrictMode>,
)
