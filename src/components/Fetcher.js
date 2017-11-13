// @flow
import React, { Component } from 'react'

import Trade from './Trade'


type Props = {
    defaultUrl: string
}

type State = {
    data: ?Object,
    uri: ?string,
    msg: ?string,
    errMsg: ?string
}

export class Fetcher extends Component<Props, State> {
    interval: ?number;

    componentDidMount () {
        const { defaultUrl } = this.props
        this.fetchUri(defaultUrl)
        this.interval = setInterval(() => this.fetchUri(defaultUrl), 1000)
    }

    componentWillUnmount () {
        this.interval && clearInterval(this.interval)
    }

    fetchUri = (uri: string) => {
        fetch(uri).then(r => r.ok ? r.json() : {}).then(data => {
            this.setState({ data, msg: `Fetched ${uri} at ${(new Date()).toString()}!`, errMsg: null })
        }).catch(e => {
            this.setState({ data: null, msg: null, errMsg: `Could not fetch ${uri}` })
        })
    }

    render () {
        const { data = null, msg, errMsg } = (this.state || {})
        return (
            <div className='fetcher container'>
                <div className='container'>
                    <h1 className='subtitle'>Trades</h1>
                    {msg && (
                        <div className='notification'>
                            {msg}
                        </div>
                    )}
                    {errMsg && (
                        <div className='notification is-warning'>
                            {errMsg}
                        </div>
                    )}
                    <div className='container trades'>
                        {data && data.slice(0, 10).map(props => <Trade {...props} />)}
                    </div>
                </div>
            </div>
        )
    }
}
