import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import CountriesContextProvider from './context/CountriesContext';
import IndividualCountry from './components/countries/Individualcountry';

//Theme and dark mode related imports 
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/layout/Globalstyle';
import { lightTheme, darkTheme } from './components/layout/Theme';
import { useDarkMode } from './components/layout/useDarkMode';
import ToggleNew from './components/layout/Togglernew';



function App() {

  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyles/>
        <div className="app">
          <BrowserRouter>
            <CountriesContextProvider>
              <ToggleNew theme={theme} toggleTheme={themeToggler}/>
              <Switch>
                <Route exact path='/' component = {Dashboard} />
                <Route path='/:name' component={IndividualCountry} />
              </Switch>  
            </CountriesContextProvider>    
          </BrowserRouter>
        </div> 
      </>
    </ThemeProvider>   
  );
}

export default App;
