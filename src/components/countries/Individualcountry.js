import React, { useContext, useEffect } from 'react'
import { CountriesContext } from '../../context/CountriesContext';
import SingleCountry from './Singlecountry';
import Countriesapi from '../countriesapi/Countriesapi';
import axios from 'axios';


const IndividualCountry = (props) => {

    //Importing the country name from the react router dom props
    const clickedName = props.match.params.name

    //Access the current country context
    const { dispatch, countrylist } = useContext(CountriesContext);

    useEffect(() => {
        if (countrylist.country.length === 0){
            getCountry();
            getCovidData();
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

    //Retrieve the covid data from the API 
    const getCovidData = async() => {
        await axios.get('https://api.covid19api.com/summary')
           .then((list) => {
               return dispatch({
                   type:'COVID_INFO',
                   payload: list.data.Countries
               })
           })
       
   }


    //Match the clicked country with the context and retrieve the necessary data
    const arrCountry = [...countrylist.country]
    const arrCovid = [...countrylist.covid]
    const matchingCountry = arrCountry.filter( country => {
        return country.name === clickedName
    })
    console.log(arrCovid);
    

    return ( 
        <div className="container individual-container">
            {matchingCountry.map(country => {  
                
                const matchingCovidCountry = arrCovid.filter(countryCovid => {
                    return  countryCovid.CountryCode === country.alpha2Code
                })

                const covidData = matchingCovidCountry[0]

                return (
                    <SingleCountry country = {country} covidData ={covidData} key = {country.name} />
                )
            })}
            
        </div>
     );


}
 
export default IndividualCountry;