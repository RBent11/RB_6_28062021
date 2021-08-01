const bcrypt = require('bcrypt');

const User = require('../models/User');

const jwt = require('jsonwebtoken');




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