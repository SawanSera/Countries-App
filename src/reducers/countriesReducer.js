
export const countriesReducer = (state, action) => {
    switch(action.type) {
        case 'SEARCH_COUNTRY':
            state.country = [];
            return {...state, country: action.payload}
        case 'CLEAR_CONTEXT':
            console.log('Reducer fired');
            return {...state, country:[]}
        case 'ALL_COUNTRY':
            return {...state, country: action.payload}
        case 'AWAY_HOME':
            return {...state, homepage: action.payload}
        case 'BACK_HOME':
            return {...state, homepage: action.payload}
        case 'TWO':
            let resp = action.payload;
            return {...state, category: resp}
        case 'INDIVIDUAL_REFRESH':
            return {...state, country: action.payload, homepage: true }
        case 'COVID_INFO':
            return {...state, covid: action.payload}
        default:
            return state
    }
}