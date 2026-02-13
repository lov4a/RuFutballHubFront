import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { AppRouter } from './app/router'
import { AppProviders } from './app/providers'

import './shared/api/interceptors'


import './shared/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </BrowserRouter>,
)
