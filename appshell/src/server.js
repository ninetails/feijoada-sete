import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import {
  ComponentDataStore,
  getAllInitialData
} from 'react-data-fetching-components'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context = {}
    const app = (
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    )
    const data = await getAllInitialData(app)
    const markup = renderToString(<ComponentDataStore data={data}>{app}</ComponentDataStore>)
    const helmet = Helmet.renderStatic()

    if (context.url) {
      res.redirect(context.url)
    } else {
      res.status(200).send(
        `<!doctype html>
  <html ${helmet.htmlAttributes.toString()}>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="root">${markup}</div>
    <script>window._COMPONENT_DATA_ = ${JSON.stringify(data).replace(/<\/script>/gi, '<\\/script>')};</script>
    ${process.env.NODE_ENV === 'production' ? `<script src="${assets.client.js}" defer></script>` : `<script src="${assets.client.js}" defer crossorigin></script>`}
    ${helmet.script.toString()}
  </body>
</html>`
      )
    }
  })

export default server
