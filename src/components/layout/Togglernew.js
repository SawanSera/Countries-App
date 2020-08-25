import React, { useState, useEffect, useContext } from 'react';
import Switch from 'react-switch';
import styled from 'styled-components';
import { func, string } from 'prop-types';
import { CountriesContext } from './../../context/CountriesContext';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

const Container = styled.div`
    margin-top: 20px;
    margin-left: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-between;
`

const Text = styled.p`
    /* margin: 10px; */
    font-size: large;
    color: ${({theme}) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    font-weight: bold;
    padding-right: 10px;
`

const BackButton = styled(Link)`
    margin-right: 10px;
`

const DarkModeContainer = styled.div`
    display: flex !important;
    flex-direction: row;
    align-content: center;
    align-items: center;
`



const ToggleNew = ({ theme, toggleTheme }) => {


   const [checked, setChecked] = useState(false);
   const {dispatch, countrylist} = useContext(CountriesContext);
   const [category, setCategory] = useState('Sort by region');

   //Set the switch to correct position based on persisted colour mode through local storag upon hard refresh
   useEffect(() => {
       const localTheme = window.localStorage.getItem('theme');
       if ( localTheme === 'dark'){
           setChecked(true);
       }else{
           setChecked(false);
       }
   }, [])


   //Initialise dropdown menu
   useEffect(() => {
    let elems = document.querySelectorAll('.dropdown-trigger');  
    M.Dropdown.init(elems, {
        coverTrigger: false,
        constrainWidth: false
    });

  });
   
   
    
    const handleChange = () => {
        setChecked(!checked)
		toggleTheme();
    }


    //Show button only when homepage prop is set to true

    const handleclick = () => {
        //setRedirect(true);
        return dispatch({
            type: 'BACK_HOME',
            payload: false
        })
    }

    //showing dropdown when the dropdown button is clicked

    const handleDrop = (event) => {
        //console.log(event.target.innerText);
            let category = event.target.innerText;
            setCategory(category)
            return dispatch({
                type: 'TWO',
                payload: category
            })
    }

    //Clearing the category selection using the x button
    const clearCat = () => {
        setCategory('Sort by region');
        return dispatch({
            type: 'TWO',
            payload: 'Sort by region'
        })
    }

    let buttons;
    if (countrylist.homepage){
        buttons = (
           <BackButton to='/' className='waves-effect waves-light btn' onClick={handleclick}>Go Back</BackButton>
        )
   }else{
       buttons = (
            <DarkModeContainer className='category-div'>
                <a className='dropdown-trigger btn' href='#!' data-target='dropdown1' data-constrainwidth='false' >{category}</a>
                <span>{category !== 'Sort by region' ? (<button className='category-close waves-effect waves-light btn' onClick={clearCat}>X</button>) : (<></>)}</span>
                <ul id='dropdown1' className='dropdown-content'>
                    <li><a  href='#!' className='category-individual' onClick={handleDrop}>Americas</a></li>
                    <li><a  href='#!' className='category-individual' onClick={handleDrop}>Asia</a></li>
                    <li><a  href='#!' className='category-individual' onClick={handleDrop}>Africa</a></li>
                    <li><a  href='#!' className='category-individual' onClick={handleDrop}>Europe</a></li>
                    <li><a  href='#!' className='category-individual' onClick={handleDrop}>Oceania</a></li>
                </ul>
            </DarkModeContainer>
       )
   }

          
        return ( 
            <Container>
                <DarkModeContainer>
                    <Text>DARK MODE</Text>
                    <Switch
                        className='react-switch'
                        checked={checked}
                        onChange={handleChange}
                        onColor='#86d3ff'
                        onHandleColor='#2693e6'
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                        activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                        height={20}
                        width={48}
                        
                    />
                </DarkModeContainer>
                <div className="back-button">
                    {buttons}
                </div>
    
            </Container>
         );
    
}


ToggleNew.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

 
export default ToggleNew;