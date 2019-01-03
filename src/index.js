/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import WeatherApp from './pages/WeatherApp';

//const testElement = React.createElement('h1', { className: 'greeting' }, 'Input Zip Code for Weather');
//ReactDOM.render(testElement, document.getElementById('root'));

ReactDOM.render(<WeatherApp />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
