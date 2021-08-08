//Fonction pour indiquer à l'utilisateur un modèle pour renforcer le mot de passe crée
const Password = require('../models/ValidePassword');

module.exports = (req, res, next) => {
    if(!Password.validate(req.body.password)){
        res.writeHead(400, 'Mot de passe requis : 8 caractères minimum dont une majuscule, une minuscule, 2 chiffres et sans espace', {
            'content-type': 'application/json'
        });
        res.end('Mot de passe pas assez complexe');
    }
    else{
        next();
    }
}

