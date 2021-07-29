/**
 * Import d'express
 * Import du module bodyParser
 * Import de la base de données mongoDB
 * Import du module path pour les chemins de fichiers
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


/**
 * Imports des routes pour la gestion des utilisateurs et des sauces
 */

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


//Appel d'express dans la variable app 
const app = express();


/**
 * Configuration des headers pour autoriser les accès à notre application
 */

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//transformation du corps de la requête en objet JSON
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//Implémentation de la route pour les sauces
app.use('/api/sauces', sauceRoutes);

//Implémentation de la route pour l'authentification des utilisateurs
app.use('/api/auth', userRoutes); 

//Export du fichier app pour l'utiliser dans d'autres fichiers
module.exports = app;