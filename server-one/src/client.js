import App from './App'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import React from 'react'
import { hydrate } from 'react-dom'

hydrate(
  <BrowserRouter basename='/one'>
    <App />
  </BrowserRouter>,
  document.getElementById('app-one')
)

if (module.hot) {
  module.hot.accept()
}
