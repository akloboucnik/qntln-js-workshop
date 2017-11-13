import { combineReducers } from 'redux'

const initialState = { trades: [], err: '', msg: '' }

const gdaxTrades = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TRADE_SUCCESS':
            return {
                ...state,
                trades: action.payload.trades,
                msg: `Fetched ${action.payload.uri} at ${(new Date()).toString()}!`,
                err: null
            }

        case 'FETCH_TRADE_FAILURE':
            return {
                ...state,
                trades: [],
                msg: null,
                err: `Could not fetch ${action.payload.uri}`
            }

        default:
            return state
    }
}

export default combineReducers({
    gdax: gdaxTrades
})
