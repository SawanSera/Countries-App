import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { CountriesContext} from './../../context/CountriesContext';

const CountriesCard = ({ country }) => {

    const {dispatch} = useContext(CountriesContext);


    //Tell context that link has been clicked
    const handleClick = () => {
        return dispatch({
            type:'AWAY_HOME',
            payload: true
        })
    }

    return (
        <Link to={'/' + country.name} onClick={handleClick}>
            <div className="main-card">
                <div className="col s4 m7">
                    <div className="card card-v1 small z-depth-4">
                        <div className="card-image">
                            <img alt="country flag" src={country.flag} />
                        </div>
                        <div className="card-content">
                            <h5>{country.name} branch added</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
     );
}





 
export default CountriesCard;