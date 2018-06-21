import App from './App'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import React from 'react'
import { hydrate } from 'react-dom'

hydrate(
  <BrowserRouter basename='/react'>
    <App />
  </BrowserRouter>,
  document.getElementById('app-react')
)

if (module.hot) {
  module.hot.accept()
}
