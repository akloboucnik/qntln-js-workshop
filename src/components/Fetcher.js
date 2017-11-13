// @flow
import React, { Component } from 'react'


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
    componentDidMount () {
        const { defaultUrl } = this.props
        this.fetchUri(defaultUrl)
    }

    fetchUri = (uri: string) => {
        fetch(uri).then(r => r.ok ? r.json() : {}).then(data => {
            this.setState({ data, msg: `Fetched ${uri}!`, errMsg: null })
        }).catch(e => {
            this.setState({ data: null, msg: null, errMsg: `Could not fetch ${uri}` })
        })
    }

    render () {
        const { data = null, msg, errMsg } = (this.state || {})
        return (
            <div className='fetcher container'>
                <div className='field'>
                    <label className='label' htmlFor='uri'>URI</label>
                    <div className='control'>
                        <input className='input' type='text' id='uri' onChange={e => this.setState({ uri: e.target.value })}/>
                    </div>
                </div>
                <div className='field'>
                    <div className='control'>
                        <input className='button' type='submit' value='Fetch!' onClick={(e) => this.state.uri && this.fetchUri(this.state.uri)}/>
                    </div>
                </div>
                <div className='container'>
                    <h1 className='subtitle'>Data</h1>
                    {msg && (
                        <div className='notification is-success'>
                            {msg}
                        </div>
                    )}
                    {errMsg && (
                        <div className='notification is-warning'>
                            {errMsg}
                        </div>
                    )}
                    <pre>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            </div>
        )
    }
}
