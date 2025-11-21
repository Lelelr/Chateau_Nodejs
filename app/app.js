const express = require('express');                                 // Charger le module express              
const routerchateau = require('./routes/chateau');                  // Importer le fichier de routes pour les châteaux
const routerproprietaire = require('./routes/proprietaire');        // Importer le routeur Express pour les propriétaires
const routercollection = require('./routes/collectiondechateaux');  // Importer ke routeur Express pour les collections de châteaux
const cors = require('cors');
const app = express();
module.exports = app;


const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Pour d’accéder aux fichiers HTML et CSS 

app.get('/', (req, res) => {
  res.send('Hello, Handigital!');
});


app.use("/api/chateaux", routerchateau);
app.use("/api/proprietaire", routerproprietaire);
app.use("/api/collections", routercollection);