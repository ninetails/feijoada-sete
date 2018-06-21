import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Link from 'react-router-dom/Link'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { withInitialData } from 'react-data-fetching-components'
import Home from './Home'
import './App.css'
import logo from './react.svg'
import reactStringReplace from 'react-string-replace'

import 'cross-fetch/polyfill'

const titleStrToComponent = input =>
  reactStringReplace(input, /<title\s[^>]+>(.*)<\/title>/i, (match, i) => (<title key={match + i}>{match}</title>))

const scriptStrToComponent = input =>
  reactStringReplace(input, /<script\ssrc="(.*)"[^>]+>.*<\/script>/i, (match, i) => (<script key={match + i} src={match} defer />))

const transformAssets = input =>
  scriptStrToComponent(titleStrToComponent(input))

const hoc = url => {
  class ServerOne extends PureComponent {
    static propTypes = {
      data: PropTypes.shape({
        assets: PropTypes.string,
        content: PropTypes.string
      })
    }

    static async getInitialData () {
      const response = await fetch(url, {
        headers: new Headers({
          'X-Microfront': 'enabled'
        })
      })
      const content = await response.text()
      const assets = response.headers.get('x-microfront-assets')

      return { assets, content }
    }

    render () {
      const { assets, content } = this.props.data

      return (
        <Fragment>
          {assets && (
            <Helmet>
              {transformAssets(assets)}
            </Helmet>
          )}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Fragment>
      )
    }
  }

  return withInitialData(ServerOne)
}

const App = ({ path }) => (
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
        <li><Link to='/one'>Server One</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/one' component={hoc(path ? `http://localhost:4000${path}` : 'http://localhost:4000/one')} />
    </Switch>
  </Fragment>
)

App.propTypes = {
  path: PropTypes.string
}

export default App
