import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Link from 'react-router-dom/Link'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import Home from './Home'
import './App.css'
import logo from './react.svg'
import ExternalContent from './ExternalContent'

import 'cross-fetch/polyfill'

const App = () => (
  <Fragment>
    <Helmet>
      <title>App</title>
    </Helmet>
    <div className='Home-header'>
      <img src={logo} className='Home-logo' alt='logo' />
      <h2>Welcome to Razzle</h2>
    </div>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/react'>Server with React</Link></li>
        <li><Link to='/angularjs'>Server with AngularJS</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/react' component={props => <ExternalContent prefix='http://localhost:4000' {...props} />} />
      <Route path='/angularjs' component={props => <ExternalContent prefix='http://localhost:5000' {...props} />} />
    </Switch>
  </Fragment>
)

App.propTypes = {
  path: PropTypes.string
}

export default App
