//Import du modèle mongoose pour la création de l'objet sauce
const Sauce = require('../models/Sauce');
//Import du module 'fs' (file system) pour la gestion des fichiers sur l'ordinateur lors de la suppression d'une sauce
const fs = require('fs');



//Contrôleur pour la création de sauce
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({
      message: 'Sauce enregistrée'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};


//Contrôleur pour la modification de sauce
exports.modifySauce = (req, res) => {
  Sauce.updateOne({
      _id: req.params.id
    }, {
      ...req.body,
      _id: req.params.id
    })
    .then(() => res.status(200).json({
      message: 'Sauce modifiée'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};


//Contrôleur pour la suppression de sauce
exports.deleteSauce = (req, res) => {
  Sauce.findOne({
      _id: req.params.id
    })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({
            _id: req.params.id
          })
          .then(() => res.status(200).json({
            message: 'Sauce supprimée'
          }))
          .catch(error => res.status(400).json({
            error
          }));
      }); 
      
    })
    .catch(error => res.status(500).json({
      error
    }));
};

//Contrôleur pour récupérer les informations d'une sauce
exports.getOneSauce = (req, res) => {
  Sauce.findOne({
      _id: req.params.id
    })
    .then(function (sauce) {
      res.status(200).json(sauce)
    })
    .catch(error => res.status(404).json({
      error
    }));
};

//Contrôleur pour récupérer toutes les sauces
exports.getAllSauce = (req, res) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({
      error
    }));
};




//Contrôleur pour la gestion des likes et dislikes

exports.likeOrDislike = (req, res) => {


  let userChoice = req.body.like;
  let userID = req.body.userId


    //Annulation d'un like ou d'un dislike
    if (userChoice === 0 && typeof userChoice === 'number') {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                if (sauce.usersLiked.includes(userID)) {
                    Sauce.updateOne(
                        {
                            _id: req.params.id
                        },
                        {
                            $pull: { usersLiked: userID },
                            $inc: { likes: -1 },
                        }
                    )
                        .then(() => res.status(200).json({ message: "Like retiré" }))
                        .catch((error) => res.status(400).json({ error }))
                }
                else if (sauce.usersDisliked.includes(userID)) {
                    Sauce.updateOne(
                        {
                            _id: req.params.id
                        },
                        {
                            $pull: { usersDisliked: userID },
                            $inc: { dislikes: -1 },
                        }
                    )
                        .then(() => res.status(200).json({ message: "Dislike retiré" }))
                        .catch((error) => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }));
    }


    //Like
    else if (userChoice === 1 && typeof userChoice === 'number') {
        Sauce.findOne({ _id: req.params.id })
            .then(() => {
                Sauce.updateOne(
                    {
                        _id: req.params.id
                    },
                    {
                        $push: { usersLiked: userID },
                        $inc: { likes: 1 },
                    }
                )
                    .then(() => res.status(201).json({ message: "Like ajouté" }))
                    .catch((error) => res.status(400).json({ error }))
            })
            .catch(error => res.status(400).json({ error }));
    }


    //Dislike
    else if (userChoice === -1 && typeof userChoice === 'number') {
        Sauce.findOne({ _id: req.params.id })
            .then(() => {
                Sauce.updateOne(
                    {
                        _id: req.params.id
                    },
                    {
                        $push: { usersDisliked: userID },
                        $inc: { dislikes: 1 },
                    }
                )
                    .then(() => res.status(201).json({ message: "Dislike ajouté" }))
                    .catch((error) => res.status(400).json({ error }))
            })
            .catch(error => res.status(400).json({ error }));
    };

}