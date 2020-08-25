import axios from 'axios';

export const Countriesapi = async(URL) => {

    //making a call to the REST Countries API
        const  response  = await axios.get(URL);
        // return new Promise(resolve => {
        //     setTimeout(() => {
        //         resolve(response);
        //     }, 100);
        // });
        return response;
 }
  
 export default Countriesapi;