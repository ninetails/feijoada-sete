import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import Link from 'react-router-dom/Link'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import Home from './Home'
import Page from './Page'

const App = () => (
  <Fragment>
    <Helmet>
      <title>ServerOne</title>
    </Helmet>
    <nav>
      <ul>
        <li><Link to='/'>Server One Home</Link></li>
        <li><Link to='/page'>Internal Page</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/page' component={Page} />
    </Switch>
  </Fragment>
)

export default App
