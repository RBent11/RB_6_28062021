//Import de password validator qui permet de créer un schéma pour renforcer les mots de passe
let passwordValidator = require('password-validator');
 
//Creation d'un schema avec password validator
let validePasswordSchema = new passwordValidator();
 
// Add properties to it
validePasswordSchema
.is().min(8)                                    // Minimum 8 caractères
.is().max(100)                                  // Maximum 100 caractères
.has().uppercase()                              // Doit avoir une majuscule
.has().lowercase()                              // Doit avoir une minuscule
.has().digits(2)                                // Doit avoir 2 chiffres
.has().not().spaces()                           // Ne doit pas contenir d'espace
.is().not().oneOf(['Passw0rd', 'Password123']); // Mots de passe interdits

module.exports = validePasswordSchema;

