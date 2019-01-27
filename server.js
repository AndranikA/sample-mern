const express = require('express');
const mongoose = require('mongoose');

// import routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// init express
const app = express();

// db config
const db = require('./config/key').mongoURI;

// connect to mongodb
mongoose.connect(db)
  .then(()=> console.log('connected to mongodb server'))
  .catch(err=> console.log(err));


app.get('/', (req, res)=> {
  res.send('Hello there');
});

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
  console.log(`listening to port ${port}`);
})