// server.js
import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import ReflectionWithJsObject from './src/usingJSObject/controllers/Reflection';
import ReflectionWithDB from './src/usingDB/controllers/Reflection';
import UserWithDb from './src/usingDB/controllers/Users';
import Auth from './src/usingDB/middleware/Auth';

dotenv.config();
const Reflection = process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJsObject;
const serverPort = process.env.SERVER_PORT;
const app = express();
//const cors = require('cors');

app.use(function(req, res, next) {
  var allowedOrigins = ['*', 'http://localhost:3000',  'http://retiutut-react-app.richardwaltman.com'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(express.json());
//app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});

app.post('/api/v1/reflections', Auth.verifyToken, Reflection.create);
app.get('/api/v1/reflections', Auth.verifyToken, Reflection.getAllReflections);
app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getOne);
app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getUserReflections);
app.put('/api/v1/reflections/:id', Auth.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id', Auth.verifyToken, Reflection.delete);
app.post('/api/v1/users', UserWithDb.create);
app.post('/api/v1/users/login',UserWithDb.login);
app.delete('/api/v1/users/me', Auth.verifyToken, UserWithDb.delete);

app.listen(serverPort)
console.log('app running on port ', serverPort);