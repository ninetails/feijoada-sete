import React, { Fragment, PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import Link from 'react-router-dom/Link'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import Home from './Home'
import './App.css'
import logo from './react.svg'

import 'cross-fetch/polyfill'

function mfHoc (url) {
  return class MFComponent extends PureComponent {
    constructor (props) {
      super(props)

      this.state = {}
    }

    componentDidMount () {
      fetch(url, {
        headers: new Headers({
          'X-Microfront': 'enabled'
        })
      })
        .then(response => response.text().then(content => {
          this.setState(state => ({
            ...state,
            content,
            assets: response.headers['x-microfront-assets']
          }))
        }))
        .catch(err => this.setState(state => ({ ...state, err })))
    }

    render () {
      const { content, assets, err } = this.state

      if (err) {
        return <div>Error! {err.message}</div>
      }

      if (!content) {
        return null
      }

      return (
        <Fragment>
          {assets && (
            <Helmet>
              {assets}
            </Helmet>
          )}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Fragment>
      )
    }
  }
}

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
        <li><Link to='/one'>Server One</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/one' component={mfHoc('http://localhost:4000/one')} />
    </Switch>
  </Fragment>
)

export default App
