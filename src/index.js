/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const testElement = React.createElement('h1', { className: 'greeting' }, 'Input Zip Code for Weather');
ReactDOM.render(testElement, document.getElementById('root'));

var weather = require('openweather-apis');
 
weather.setLang('en');
// English - en, Russian - ru, Italian - it, Spanish - es (or sp),
// Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
// Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
// Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
// Turkish - tr, Croatian - hr, Catalan - ca


// set city by name
weather.setCity('Fairplay');
 // or set the coordinates (latitude,longitude)
//weather.setCoordinate(50.0467656, 20.0048731);
// or set city by ID (recommended by OpenWeatherMap)
//weather.setCityId(4367872);
// or set zip code
//weather.setZipCode(33615);

// 'metric'  'internal'  'imperial'
 weather.setUnits('imperial');

// check http://openweathermap.org/appid#get for get the APPID
 weather.setAPPID(ownKey);

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



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
