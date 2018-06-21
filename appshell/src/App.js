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

const ExternalContent = (() => {
  class ExternalContentRaw extends PureComponent {
    static propTypes = {
      url: PropTypes.string.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string
      }),
      data: PropTypes.shape({
        assets: PropTypes.string,
        content: PropTypes.string
      })
    }

    static async getInitialData ({ location, url }) {
      const { pathname } = location
      const response = await fetch(`${url}${pathname}`, {
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

  return withInitialData(ExternalContentRaw)
})()

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
      </ul>
    </nav>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/react' component={props => <ExternalContent url='http://localhost:4000' {...props} />} />
    </Switch>
  </Fragment>
)

App.propTypes = {
  path: PropTypes.string
}

export default App
