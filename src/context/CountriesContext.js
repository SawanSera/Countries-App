import React, { createContext, useReducer} from 'react';
import { countriesReducer } from '../reducers/countriesReducer';

export const CountriesContext = createContext();
const initalState = {
    country:[],
    homepage: false,
    category: 'Sort by region',
    covid:[]
}

const CountriesContextProvider = (props) => {

    const [countrylist, dispatch] = useReducer(countriesReducer, initalState);
    //console.log('context updated');
    //console.log(countrylist);

    return (
        <CountriesContext.Provider value={{ countrylist, dispatch }}>
            {props.children}
        </CountriesContext.Provider>
    );
}

export default CountriesContextProvider;