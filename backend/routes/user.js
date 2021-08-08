//routes pour la création d'un compte utilisateur ou la connexion d'un utilisateur 

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const validePassword = require('../middleware/validePassword')

router.post('/signup', validePassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;



