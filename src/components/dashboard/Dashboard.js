import React from 'react'
import Countrylist from './Countrylist';
import SearchBar from './Searchbar';

const dashboard = () => {
    return ( 
        <div className="dashboard">
            <SearchBar/>
            <Countrylist/>
        </div>
     );
}
 
export default dashboard;