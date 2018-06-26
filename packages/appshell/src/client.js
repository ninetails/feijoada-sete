import App from './App'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import React from 'react'
import { hydrate } from 'react-dom'
import { ComponentDataStore } from 'react-data-fetching-components'

const data = window._COMPONENT_DATA_

hydrate(
  <ComponentDataStore data={data}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ComponentDataStore>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
