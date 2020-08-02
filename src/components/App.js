import React,{useState} from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter,Route,Switch } from 'react-router-dom';
import theme from './ui/Theme';
import Header from './ui/Header';
import Footer from './ui/Footer';
import LandingPage from './LandingPage';
import Services from './Services';
import CustomSoftware from './CustomSoftware.js';
import MobileApps from './MobileApps.js';
import Websites from './Websites.js';
import Revolution from './Revolution.js';
import AboutUs from './AboutUs.js';
import Contact from './Contact.js';
import Estimate from './Estimate.js';

function App() {

    const [selectedIndex , setSelectedIndex] = useState(0);
    const [value,setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
      <Switch>
      <Route exact path="/" render={(props) => <LandingPage {...props} setValue={setValue} setSelectedIndex={setSelectedIndex}/>} />
      <Route exact path="/services" render={(props) => <Services {...props} setValue={setValue} setSelectedIndex={setSelectedIndex}/>} />
      <Route exact path="/customsoftware" render={(props) => <CustomSoftware {...props} setValue={setValue} setSelectedIndex={setSelectedIndex}/>} />
      <Route exact path="/mobileapps" render={(props) => <MobileApps {...props} setValue={setValue} setSelectedIndex={setSelectedIndex}/>} />
      <Route exact path="/websites" render={(props) => <Websites {...props} setValue={setValue} setSelectedIndex={setSelectedIndex}/>} />
      <Route exact path="/revolution" render={(props) => <Revolution {...props} setValue={setValue} setSelectedIndex={setSelectedIndex}/>} />
      <Route exact path="/about" render={(props) => <AboutUs {...props} setValue={setValue} setSelectedIndex={setSelectedIndex}/>} />
      <Route exact path="/contact" render={(props) => <Contact {...props} setValue={setValue} setSelectedIndex={setSelectedIndex}/>} />
      <Route exact path="/estimate" render={(props) => <Estimate {...props} setValue={setValue} setSelectedIndex={setSelectedIndex}/>} />
      </Switch>
      <Footer setValue={setValue} setSelectedIndex={setSelectedIndex}/>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
