import React, {useState, useContext, useEffect} from 'react'
import { CountriesContext } from '../../context/CountriesContext';
import CountryCard from '../countries/Countriescard';


const Countrylist = () => {

    const [loading, setLoading] = useState(false);
    const {countrylist}  = useContext(CountriesContext);

    //Check if the context is populated in order to show the card or not
    
    useEffect(() => {
        if (countrylist.country.length === 0){
            setLoading(false);
        }else{
            setLoading(true);
        }
    }, [countrylist])

   
    //Adding pre-loader listener for when search query is sent for data
     if (!loading){
         return (
            <div>
            </div>
         )
     }else{
        return ( 
            
                <div className='country-list'>            
                    {
                        countrylist.category === 'Sort by region'? 
                        countrylist.country.map(country => {
                            return (<CountryCard country={country} key={country.name} />)
                        })
                        :
                        countrylist.country
                        .filter( country => country.region === countrylist.category)
                        .map(country => {
                            return (<CountryCard country={country} key={country.name} />)
                        }
                    ) 
                    }
                </div>
            
        );     
    }                       
}

export default Countrylist;