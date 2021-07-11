const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


/**
 * Connection à la base de données MongoDB
 */
mongoose.connect('mongodb+srv://Pekocko:pekocko@cluster0.e9whu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


/**
 * Configuration des headers
 */

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());


app.use('/api/sauces', sauceRoutes);

// à voir si ça devient pas /api/login
app.use('/api/auth', userRoutes); 


module.exports = app;