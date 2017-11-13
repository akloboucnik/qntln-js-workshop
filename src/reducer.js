import { combineReducers } from 'redux'

const initialState = { trades: [], err: '', msg: '', filters: { buy: true, sell: true } }

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

        case 'TOGGLE_SIDE_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.side]: action.payload.show
                }
            }

        default:
            return state
    }
}

export default combineReducers({
    gdax: gdaxTrades
})
