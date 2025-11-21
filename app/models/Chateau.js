const mongoose = require('mongoose');

const chateauSchema = new mongoose.Schema({
    nom: String,                // Nom du château
    type: String,               // Château / Manoir
    style: String,              // Classique / Renaissance / ...
    date_construction: String,  // Année de construction
    surface: Number,            // Surface en m2
    description: String,        // Description du château
    statut: String,             // Abandonné / Habité / en travaux
    prix: Number                // prix du château
});

module.exports = mongoose.model('Chateau', chateauSchema);