import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { withInitialData } from 'react-data-fetching-components'
import reactStringReplace from 'react-string-replace'

const titleStrToComponent = input =>
  reactStringReplace(input, /<title\s[^>]+>(.*)<\/title>/i, (match, i) => (<title key={match + i}>{match}</title>))

const scriptStrToComponent = input =>
  reactStringReplace(input, /<script\ssrc="([^"]+)"[^>]*><\/script>/gi, (match, i) => (<script key={match + i} src={match} defer />))

const transformAssets = input =>
  input ? scriptStrToComponent(titleStrToComponent(input)) : null

export class ExternalContentRaw extends PureComponent {
  static propTypes = {
    prefix: PropTypes.string,
    url: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }),
    data: PropTypes.shape({
      assets: PropTypes.string,
      content: PropTypes.string
    })
  }

  static defaultProps = {
    url: null,
    data: {
      assets: null,
      content: null
    }
  }

  static async getInitialData ({ location, url, prefix }) {
    const { pathname } = location
    try {
      const response = await fetch(url || `${prefix}${pathname}`, {
        headers: new Headers({
          'X-Microfront': 'enabled'
        })
      })
      const content = await response.text()
      const assets = response.headers.get('x-microfront-assets')

      return { assets, content }
    } catch (err) {
      return {}
    }
  }

  loading () {
    return <div>Loading...</div>
  }

  error () {
    return <div>Error</div>
  }

  render () {
    const { assets, content } = this.props.data || {}

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

export default withInitialData(ExternalContentRaw)
