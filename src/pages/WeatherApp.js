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
//import ListItemText from '@material-ui/core/ListItemText';

var currentTemperature = 0.0;
var currentPressure = 0;
var currentHumidity = 0;
var currentDescription = '';
const weather = require('openweather-apis');

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handFormSubmit = this.handFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    console.log("App Init");
  }

  /* This life cycle hook gets executed when the component mounts */
  componentDidMount() {
    this.setState({
      currentTemp: 5.0,
      currentPres: 4,
      currentHum: 3,
      currentDesc: "two",
    });
  }

  // Form submission logic
  handFormSubmit(e) {
    
    e.preventDefault();
    let userCity = this.state.cityName;
    
    //set city
    weather.setCity(userCity);
    weather.setLang('en');
    weather.setUnits('imperial');
    weather.setAPPID('7f018bf7be7a15eae90908537e12fc3e');

    // get the Temperature  
    weather.getTemperature(function(err, temp){
      currentTemperature = temp;
    });
    // get the Atm Pressure
    weather.getPressure(function(err, pres){
      currentPressure = pres;
    });

    // get the Humidity
    weather.getHumidity(function(err, hum){
      currentHumidity = hum;
    });

    // get the Description of the weather condition
    weather.getDescription(function(err, desc){
      currentDescription = desc;
    });

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
        cityName: e.target.value
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
        cityName: ''
      },
    });
  }

  handleClick = () => {
    this.setState({
      open: true,
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
      this.handFormSubmit();
    }
  }

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
            <Fab variant="extended" color={this.state.fetchButtonClr} onClick={this.handFormSubmit}>
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
                        Temperature: {currentTemperature} &deg;F
                      </ListItem>
                      <ListItem>
                        Pressure: {currentPressure} hPa
                      </ListItem>
                      <ListItem>
                        Relative Humidity: {currentHumidity}%
                      </ListItem>
                      <ListItem>
                        Condition: {currentDescription}
                      </ListItem>
                    </List>
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

export default (WeatherApp);