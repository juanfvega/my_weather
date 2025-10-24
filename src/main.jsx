import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Weather from './containers/Weather'
import './index.css'
import Tabs from './containers/Tabs.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tabs />
  </StrictMode>,
)
