import React, {useState, useContext, useEffect} from 'react';
import {Countriesapi} from '../countriesapi/Countriesapi';
import { CountriesContext } from '../../context/CountriesContext';
import axios from 'axios';


const SearchBar = () => {

    //State to store the dat
    const [query, setQuery] = useState('');
    const [keyPressed, setKeyPressed] = useState('');
    const {dispatch} = useContext(CountriesContext);
    
    //REST Countries API URL
    const URL = `https://restcountries.eu/rest/v2/name/${query}`

    //Empty input field will clear the context
    useEffect(() => {
        if (keyPressed === 'Backspace' && query === ''){
            allCountries();
        }else if( query === ''){
            allCountries();
        } 
    }, [query, keyPressed])

    //making a call to the REST Countries API
    const getData = async(e) => {
        setKeyPressed(e.key);
        //if (e.key === 'Enter'){
            await Countriesapi(URL)
            .then((resp) => {
                return dispatch({
                    type: 'SEARCH_COUNTRY',
                    payload: resp.data
                })
            })
            .catch((err) => console.log(err));
        //}
    };



    // Call all countries API call
    const allCountries = async() => {
        await axios.get("https://restcountries.eu/rest/v2/all")
            .then( resp => {
                //console.log(resp.data)
                return dispatch({
                    type: 'ALL_COUNTRY',
                    payload: resp.data
                })
            })
    }


    return ( 

        <div className="container searchbar z-depth-5">
            <input 
                type="search"
                className='search'
                placeholder='Search Country'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={getData}
            />
        </div>

     );
}
 
export default SearchBar;