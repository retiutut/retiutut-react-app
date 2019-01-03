import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './WeatherApp.css';
//import Inputs from './InputTest';
import Input from '@material-ui/core/Input';
import SecretButton from './SecretButton';
import Typography from '@material-ui/core/Typography';

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cityName: ''
        /*
        email: '',
        age: '',
        gender: '',
        expertise: '',
        about: ''
        */
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
    let userData = this.state.cityName;
    fetchWeather(userData);
    console.log("Tried to submit form...");
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
  }

  handleChange(e) {
    this.setState({
        cityName: e.target.value
    });
    console.log("Change has happened");
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

  render() {
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
              <SecretButton
                  type="button"
                  onChange={this.handleFormSubmit}
              />
            </p>
          </body>
      </div>
    );
  }
}

function fetchWeather(cityName) {

  //////////////////////////////
  //      Set Functions       //
  //////////////////////////////

  var weather = require('openweather-apis');
  weather.setLang('en');
  weather.setCity(cityName);

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
}

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