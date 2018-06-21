import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import cors from 'cors'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(cors({
    exposedHeaders: ['X-Microfront-Assets']
  }))
  .get('/one*', (req, res) => {
    const context = {}
    const markup = renderToString(
      <StaticRouter basename='/one' context={context} location={req.url}>
        <App />
      </StaticRouter>
    )
    const helmet = Helmet.renderStatic()

    if (context.url) {
      res.redirect(context.url)
    } else if (req.headers['x-microfront']) {
      res.set({
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Expires': '-1',
        'Pragma': 'no-cache',
        'X-Microfront-Assets': `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}<script src="${assets.client.js}" defer></script>`
      }).status(200).send(`<div id="app-one">${markup}</div>`)
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
    <div id="app-one">${markup}</div>
    ${process.env.NODE_ENV === 'production' ? `<script src="${assets.client.js}" defer></script>` : `<script src="${assets.client.js}" defer crossorigin></script>`}
  </body>
</html>`
      )
    }
  })

export default server
