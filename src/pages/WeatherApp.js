import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './WeatherApp.css';
//import Inputs from './InputTest';
import Input from '@material-ui/core/Input';
//import material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

var currentTemperature = 0.0;
var currentPressure = 0;
var currentHumidity = 0;
var currentDescription = '';

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cityName: '',
        open: false,
        currentTemp: 0.0,
        currentPres: 0,
        currentHum:0,
        currentDesc: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    console.log("App Init");
  }

  /* This life cycle hook gets executed when the component mounts */

  handleFormSubmit(e) {
    // Form submission logic
    e.preventDefault();
    let userCity = this.state.cityName;
    //////////////////////////////
    //      Set Functions       //
    //////////////////////////////

    var weather = require('openweather-apis');
    weather.setLang('en');
    weather.setCity(userCity);
    weather.setUnits('imperial');
    weather.setAPPID('7f018bf7be7a15eae90908537e12fc3e');
    var cTemp;
    var cPres;
    var cHum;
    var cDesc = '';

    //////////////////////////////
    //      Get Functions       //
    //////////////////////////////

    // get the Temperature  
    weather.getTemperature(function(err, temp){
      console.log("temp: " + temp);
      cTemp = temp;
      currentTemperature = temp;
    });

    // get the Atm Pressure
    weather.getPressure(function(err, pres){
      console.log("pres: " + pres);
      cPres = pres;
    });

    // get the Humidity
    weather.getHumidity(function(err, hum){
      console.log("hum: " + hum);
      cHum = hum;
    });

    // get the Description of the weather condition
    weather.getDescription(function(err, desc){
      console.log("desc: " + desc);
      cDesc = desc;
    });
    console.log("Tried to submit form using: " + userCity);

    this.setState({
      currentTemp: cTemp,
      currentPres: cPres,
      currentHum: cHum,
      currentDesc: cDesc,
      open: true,
    });
  }

  handleChange(e) {
    this.setState({
        cityName: e.target.value
    });
    //console.log("Change has happened");
  }

  handleClearForm(e) {
    // Logic for resetting the form
    e.preventDefault();
    this.setState({ 
      newUserLocation: {
        cityName: ''
      },
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    var { open } = this.state;

    return (
      <div className="WeatherApp">
        <header className="WeatherApp-header">
          <img 
              id="layer1" 
              src="https://img.icons8.com/ultraviolet/480/000000/sun.png"
              className="Sun-logo"
              alt="blueSunLogo"
          />
          <img 
              id="layer2" 
              src={logo} 
              className="React-logo" 
              alt="reactlogo" 
          />
        </header>
        <body className="WeatherApp-body">
          <p>
            <Typography variant="h4">
            Enter Location to Get Current Weather
            </Typography>
          </p>
          <p>
            <Input 
                type="text"
                //defaultValue="New Orleans"
                value={this.state.cityName}
                onChange={this.handleChange}
            />
          </p>
          <p>
          <Typography variant="h5" gutterBottom>
            Getting Weather for {this.state.cityName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Click to see the Weather!
          </Typography>
          <Button variant="contained" color="secondary" onClick={this.handleFormSubmit}>
            Super Secret Information
          </Button>
          </p>
        </body>
        <footer className="WeatherApp-footer">

        <Dialog open={open} onClose={this.handleClose}>
            <DialogTitle>Super Secret Weather</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {currentTemperature}
                {currentPressure}
                {currentHumidity}
                {currentDescription}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.handleClose}>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </footer>
      </div>
    );
  }
}

WeatherApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WeatherApp;


/*
var weather = require('openweather-apis');
 
weather.setLang('en');
// English - en, Russian - ru, Italian - it, Spanish - es (or sp),
// Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
// Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
// Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
// Turkish - tr, Croatian - hr, Catalan - ca


// set city by name
weather.setCity('New Orleans');
 // or set the coordinates (latitude,longitude)
//weather.setCoordinate(50.0467656, 20.0048731);
// or set city by ID (recommended by OpenWeatherMap)
//weather.setCityId(4367872);
// or set zip code
//weather.setZipCode(33615);

// 'metric'  'internal'  'imperial'
 weather.setUnits('imperial');

// check http://openweathermap.org/appid#get for get the APPID
 weather.setAPPID('7f018bf7be7a15eae90908537e12fc3e');

//////////////////////////////
//      Get Functions       //
//////////////////////////////

 // get the Temperature  
 weather.getTemperature(function(err, temp){
    console.log(temp);
});

// get the Atm Pressure
weather.getPressure(function(err, pres){
    console.log(pres);
});

// get the Humidity
weather.getHumidity(function(err, hum){
    console.log(hum);
});

// get the Description of the weather condition
weather.getDescription(function(err, desc){
    console.log(desc);
});
*/


/*
fetch('http://example.com',{
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(response => {
    response.json().then(data =>{
      console.log("Successful" + data);
    })
});
*/