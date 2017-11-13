// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux';

import Trade from './Trade'
import { fetchTrades, toggleSideFilter } from '../actions'

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
    filters: { buy: boolean, sell: boolean },
    fetchTrades: Function,
    toggleSideFilter: Function
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
        const { trades = null, filters, msg, err, toggleSideFilter } = this.props
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
                    <div className='container'>
                        <h2 className='subtitle small'>Show types:</h2>
                        <div className='field'>
                            <div className='control'>
                                <label className='checkbox'>
                                    <input type='checkbox' checked={filters.buy} onChange={e => toggleSideFilter('buy', e.target.checked)}/>BUY
                                </label>
                            </div>
                        </div>
                        <div className='field'>
                            <div className='control'>
                                <label className='checkbox'>
                                    <input type='checkbox' checked={filters.sell} onChange={e => toggleSideFilter('sell', e.target.checked)} />SELL
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='container trades'>
                        {trades && trades.filter(t => filters[t.side]).slice(0, 10).map((props, i) => <Trade key={i} {...props} />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => (state.gdax),
    { fetchTrades, toggleSideFilter }
)(Fetcher);
