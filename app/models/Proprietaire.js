const mongoose = require('mongoose');

const proprietaireSchema = new mongoose.Schema({
    nom: String,        // Nom de famille
    prenom: String,     // Prenom
    telephone: String,  // Téléphone
    email: String,      // Email
    adresse: String,    // Adresse postale
    chateaux: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chateau' }]
});

module.exports = mongoose.model('Propriétaire', proprietaireSchema);