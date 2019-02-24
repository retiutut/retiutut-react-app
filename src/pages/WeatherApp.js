import React from 'react';
import logo from './logo.svg';
import './WeatherApp.css';
//import Inputs from './InputTest';
import Input from '@material-ui/core/Input';
//import material-ui
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
//import ListItemText from '@material-ui/core/ListItemText';
const weather = require('openweather-apis');

let currentWeather = {
  temp: 0.0,
  pres: 0,
  hum: 0,
  desc: ''
}

const API_KEY = process.env.REACT_APP_WEATHER_KEY;
const SERVER_URL = (process.env.NODE_ENV === 'development')
  ? process.env.REACT_APP_SERVER_URL
  : process.env.REACT_APP_SERVER_URL_WEB;

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cityName: 'New Orleans',
        open: false,
        fetchButtonTxt: 'Get Weather for ',
        fetchButtonClr: 'primary',
        weatherFetched: false,
        cityNameFetched: '',
        success: '',
        authToken: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.getReflections = this.getReflections.bind(this);
    this.postLogin = this.postLogin.bind(this);
    console.log("App Init. Environment = " + process.env.NODE_ENV);
  }

  /* This life cycle hook gets executed when the component mounts */
  componentDidMount() {
    //this.postLogin();
    this.testDBConnection();
  }

  testDBConnection() {
    //basic GET
    fetch('http://localhost:3342/', { 
      method: 'GET',
      data: {
        email: 'name',
        password: 'password'
      }
    })
    .then(response => response.json())
    .then(body => {
      //console.log(body);
      this.setState({success: body.message})
    });
  }

  postLogin() {
    const self = this;
    
    const loginURL = SERVER_URL + '/api/v1/users/login/';
    //attempt login
    fetch(loginURL, { 
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password: "mypassword", email: 'meow2424242424@cats.com'})
    })
    .then(response => response.json())
    .then(body => {
      //messageSQL = body.message;
      console.log(body.token);
      self.setState({authToken: body.token})
      //return self.getReflections(body.token);
      return self.getMostRecentReflection(body.token);
    })
  }

  getReflections = (token) => {
    const allReflectionsURL = SERVER_URL + '/api/v1/reflections/'
    fetch(allReflectionsURL, { 
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        })
    .then(response => response.json())
    .then(body => {
      console.log(body);
      //messageSQL = body.message;
      console.log(body.success);
      this.setState({success: body.success})
    })
  };

  getMostRecentReflection = (token) => {
    const allReflectionsURL = SERVER_URL + '/api/v1/reflections/'
    fetch(allReflectionsURL, { 
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        })
    .then(response => response.json())
    .then(body => {
      console.log(body);
      this.setState({success: body.rows[body.rowCount-1].success})
    })
  };

  // Form submission logic
  handleFormSubmit(e) {
    if (!this.state.weatherFetched) {
      let userCity = this.state.cityName;
      
      //set city
      weather.setCity(userCity);
      weather.setLang('en');
      weather.setUnits('imperial');
      weather.setAPPID(API_KEY);

      // get the Temperature  
      weather.getTemperature(function(err, temp){
        currentWeather.temp = temp;
      });
      // get the Atm Pressure
      weather.getPressure(function(err, pres){
        currentWeather.pres = pres;
      });

      // get the Humidity
      weather.getHumidity(function(err, hum){
        currentWeather.hum = hum;
      });

      // get the Description of the weather condition
      weather.getDescription(function(err, desc){
        currentWeather.desc = desc;
      });
    }

    this.setState({
      fetchButtonTxt: 'Weather Fetched for ',
      fetchButtonClr: 'default',
      weatherFetched: true,
      cityNameFetched: this.state.cityName,
    });
      
  }

  //Handles changes to text input
  handleChange(e) {
    this.setState({
        cityName: e.target.value,
    });
    //console.log("Change has happened");
    if (this.state.weatherFetched) {
      this.setState({
        weatherFetched: false,
        fetchButtonTxt: 'Get Weather for ',
        fetchButtonClr: 'primary',
      });
    };
  }

  handleClearForm(e) {
    // Logic for resetting the form
    e.preventDefault();
    this.setState({ 
      newUserLocation: {
        cityName: '',
        success: ''
      },
    });
  }

  handleClick = () => {
    this.setState({
      open: true,
      //success: message
    });
  };

  handleClose(e) {
    this.setState({
      open: false,
    });
  };

  //Submit form if user presses enter while using text field
  onKeyPress= (e) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed');
      // write your functionality here
      this.handleFormSubmit();
    }
  }

  render() {
    let { open } = this.state;

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
        <Grid container direction="column" spacing={32} >
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="cityNameInput" >
                City Name
              </InputLabel>
              <Input 
                  id="cityNameInput"
                  type="text"
                  value={this.state.cityName}
                  onChange={this.handleChange}
                  onKeyDown={this.onKeyPress}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Fab variant="extended" color={this.state.fetchButtonClr} onClick={this.handleFormSubmit}>
              {this.state.fetchButtonTxt}{this.state.cityName}
            </Fab>
          </Grid>
          <Grid item xs={12}>
            <Fab variant="extended" color="secondary" onClick={this.handleClick}>
              Click to View Weather
            </Fab>
          </Grid>
        </Grid>
        
        <footer className="WeatherApp-footer">
          <Dialog open={open} onClose={this.handleClose}>
                <DialogTitle id="secret-weather">Super Secret Weather</DialogTitle>
                <DialogContent>
                    <List>
                      <ListItem>
                        City: {this.state.cityNameFetched}
                      </ListItem>
                      <ListItem>
                        Temperature: {currentWeather.temp} &deg;F
                      </ListItem>
                      <ListItem>
                        Pressure: {currentWeather.pres} hPa
                      </ListItem>
                      <ListItem>
                        Relative Humidity: {currentWeather.hum}%
                      </ListItem>
                      <ListItem>
                        Condition: {currentWeather.desc}
                      </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                  <Button color="primary" onClick={this.handleClose}>
                    OK
                  </Button>
                </DialogActions>
          </Dialog>
          <Typography>
          Recent Weather: "{ this.state.success }"
          </Typography>
        </footer>
      </div>
    );
  }
}

export default (WeatherApp);