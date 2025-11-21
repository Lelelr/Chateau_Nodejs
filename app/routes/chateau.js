const express = require('express');
const routerchateau = express.Router();
const Chateau = require('../models/Chateau');



// -------------------------- AJOUTER un château -------------------------- //
routerchateau.post('/', async (req, res) => {
    try {
        const newChateau = new Chateau(req.body);
        const chateauRegistered = await newChateau.save();
        res.status(200).json(chateauRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// ------------------------- RÉCUPÉRER un château ------------------------- //
routerchateau.get('/', async (req, res) => {
    try {
        const chateau = await Chateau.find();
        res.status(200).json(chateau);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// ---------------------- LIRE / AFFICHER un château ---------------------- //
routerchateau.get('/:id', async (req, res) => {
    try {
        const chateau = await Chateau.findById(req.params.id);
        res.status(200).json(chateau);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// ------------------------- MODIFIER un château -------------------------- //
routerchateau.put('/:id', async (req, res) => {
    try {
        const updatedChateau = await Chateau.findByIdAndUpdate(
            req.params.id, // ID du château
            req.body,      // Les nouvelles données
            { new: true }  // Retourne le document Mis à jour
        );

        if (!updatedChateau) {
            return res.status(404).json({ message: "Château non trouvé" });
        }

        res.status(200).json(updatedChateau);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// ------------------------- SUPPRIMER un château ------------------------- //
routerchateau.delete('/:id', async (req, res) => {
    try {
        const deletedChateau = await Chateau.findByIdAndDelete(req.params.id);
        if (!deletedChateau) {
            return res.status(404).json({ message: "Château non trouvé" });
        }
        res.status(200).json({ message: "Château supprimé avec succès", deletedChateau });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



module.exports = routerchateau;