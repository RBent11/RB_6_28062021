# So Pekocko 
##Projet 6 - Formation Développeur Web d'Openclassroom :

### Construisez une API sécurisée pour une application d'avis gastronomiques
#### Piquante - La meilleure application de notation de sauces 

![So Pekocko](/assets/images/logo.png)

#### Contexte 

La marque So Pekocko, qui crée des sauces piquantes, connaît un franc succès, en partie grâce à sa chaîne de vidéos YouTube “La piquante”.

L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”.

#### Mise en place du projet en local

>:warning: Ouvrir le terminal en administrateur avant de faire les installations 

1. Créer votre repo Github pour le P6
    - Créer un dossier backend
    - Créer un dossier frontend

2. Cloner le repo Github du lien suivant dans le dossier frontend créé précedemment : [Front-end de So Pekocko](https://github.com/OpenClassrooms-Student-Center/dwj-projet6)


3. Installer Node Version Manager (NVM)
    1. Se rendre à cette adresse : [Télécharger NVM](https://github.com/coreybutler/nvm-windows/releases)
    2. Pour windows, télécharger nvm-setup.zip
    3. Dézipper. Double-cliquer sur l'exécutable "nvm-setup.exe"
    4. Ouvrir le terminal et vérifier la version avec la commande 
    ```nvm -v```
    5. Installer la version de node 12.18.3
    ```nvm install 12.18.3```
    6. La sélectionner 
    ```nvm use 12.18.3```

4. Depuis le terminal en administrateur, se rendre dans le dossier frontend avec le repo Git cloné et lancer les commandes suivantes **sans corriger les erreurs avec un ```npm audit fix```**. Lancer juste la suite de commandes tel quel.

    ```npm install```
    ```npm uninstall node-sass```
    ```npm install --save-dev --unsafe-perm node-sass@4.14.1```
    ```npm start```

5. Depuis un navigateur, se rendre à l'adresse
[localhost:4200](localhost:4200)
    La page d'authentification devrait apparaitre.