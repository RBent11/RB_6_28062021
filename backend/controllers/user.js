// Import des modules bcrypt pour crypter les mots de passe, le modèle User pour la création d'un utilisateur et le module jsonwebtoken pour la création de token de connexion
const bcrypt = require('bcrypt');

const User = require('../models/User');

const jwt = require('jsonwebtoken');


//Fonction inscritpion permettant la création d'un compte avec un email et un mot de passe
 
exports.signup = (req, res) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {

      let buffer = new Buffer(req.body.email);
      let emailInbase64 = buffer.toString('base64');

      const user = new User({
        email: emailInbase64,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({
          message: 'Utilisateur créé !'
        }))
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
};



/**
 Fonction login qui envoie en requête le mail et le mot de passe de l'utiilisateur, 
 vérifie qu'il existe bien dans la base de données, et permet la connexion en réponse
 */

exports.login = (req, res) => {

  let buffer = new Buffer(req.body.email);
  let emailInbase64 = buffer.toString('base64');

  User.findOne({
      email: emailInbase64
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
        });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !'
            });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({
                userId: user._id
              },
              'RANDOM_TOKEN_SECRET', {
                expiresIn: '24h'
              }
            )
          });
        })
        .catch(error => res.status(500).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
};