import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Weather from './containers/Weather'
import './index.css'
import Init from './containers/Init.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Init />
  </StrictMode>,
)
