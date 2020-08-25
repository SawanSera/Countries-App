import React, { useContext, useEffect } from 'react'
import { CountriesContext } from '../../context/CountriesContext';
import SingleCountry from './Singlecountry';
import Countriesapi from '../countriesapi/Countriesapi';


const IndividualCountry = (props) => {

    //Importing the country name from the react router dom props
    const clickedName = props.match.params.name

    //Access the current country context
    const { dispatch, countrylist } = useContext(CountriesContext);

    useEffect(() => {
        if (countrylist.country.length === 0){
            getCountry();
        }

    }, [countrylist])

    //Persist data on hard refresh 
    const URL = `https://restcountries.eu/rest/v2/name/${clickedName}`

    const getCountry = async() => {
         await Countriesapi(URL)
            .then((resp) => {
                return dispatch({
                    type: 'INDIVIDUAL_REFRESH',
                    payload: resp.data
                })
            })
            .catch(err => console.log(err));
    }


    //Match the clicked country with the context and retrieve the necessary data
    const arrCountry = [...countrylist.country]
    const matchingCountry = arrCountry.filter( country => {
        return country.name === clickedName
    })
    

    return ( 
        <div className="container individual-container">
            {matchingCountry.map(country => {
                return (
                    <SingleCountry country = {country} key = {country.name} />
                )
            })}
        </div>
     );


}
 
export default IndividualCountry;