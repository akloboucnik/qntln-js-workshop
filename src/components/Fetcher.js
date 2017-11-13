// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux';

import Trade from './Trade'
import { fetchTrades } from '../actions'

type TradeType = {
    trade_id: number,
    time: string,
    price: string,
    size: string,
    side: 'sell'|'buy'
}

type Props = {
    trades: Array<TradeType>,
    msg: ?string,
    err: ?string,
    fetchTrades: Function
}

class Fetcher extends Component<Props> {
    interval: ?number;

    componentDidMount () {
        const { fetchTrades } = this.props
        fetchTrades();
        this.interval = setInterval(fetchTrades, 1000)
    }

    componentWillUnmount () {
        this.interval && clearInterval(this.interval)
    }

    render () {
        const { trades = null, msg, err } = (this.props || {})
        return (
            <div className='fetcher container'>
                <div className='container'>
                    <h1 className='subtitle'>Trades</h1>
                    {msg && (
                        <div className='notification'>
                            {msg}
                        </div>
                    )}
                    {err && (
                        <div className='notification is-warning'>
                            {err}
                        </div>
                    )}
                    <div className='container trades'>
                        {trades && trades.slice(0, 10).map(props => <Trade {...props} />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => (state.gdax),
    { fetchTrades }
)(Fetcher);
