// @flow
const fetchTradesSuccess = (uri: string, trades) => {
    return {
        type: 'FETCH_TRADE_SUCCESS',
        payload: { uri, trades }
    }
}

const fetchTradesFailure = (uri: string) => {
    return {
        type: 'FETCH_TRADE_FAILURE',
        payload: { uri }
    }
}

const GDAX_ENDPOINT = 'http://api.gdax.com/products/BTC-EUR/trades'

export const fetchTrades = () => {
    return (dispatch: Function) => {
        fetch(GDAX_ENDPOINT).then(r => r.ok ? r.json() : {}).then(data => {
            dispatch(fetchTradesSuccess(GDAX_ENDPOINT, data));
        }).catch(e => {
            dispatch(fetchTradesFailure(GDAX_ENDPOINT));
        })
    }
}

export const toggleSideFilter = (side: 'buy'|'sell', show: boolean) => {
    return {
        type: 'TOGGLE_SIDE_FILTER',
        payload: { side, show }
    }
}
