import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'

class Home extends React.Component {
  render () {
    return (
      <div className='Home'>
        <Fragment>
          <Helmet>
            <title>Home</title>
          </Helmet>
        </Fragment>
        <p className='Home-intro'>
          To get started, edit <code>src/App.js</code> or{' '}
          <code>src/Home.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default Home
