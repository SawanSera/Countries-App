import React from 'react';


const SingleCountry = ({country}) => {

    return ( 

        <div className="single-container card z-depth-4">
            <div className='image-container'>
                <img alt="country displayed" src={country.flag} />
            </div>
            <div className='content-container'>
                <div className='country-name'>
                    <h2>{country.name}</h2>
                </div>
                <div className="written-content">
                <div>
                    <p>
                        Capital: {country.capital}
                    </p>
                    <p>
                        Region: {country.region}
                    </p>
                    <p>
                        Population: {country.population}
                    </p>
                </div>
                </div>
            </div>
        </div>

     );
}
 
export default SingleCountry;