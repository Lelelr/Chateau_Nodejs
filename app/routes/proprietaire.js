const express = require('express');
const mongoose = require('mongoose');
const routerproprietaire = express.Router();
const Proprietaire = require('../models/Proprietaire');





// ------------------------ AJOUTER un propriétaire ----------------------- //
routerproprietaire.post('/', async (req, res) => {
    try {
        const newProprietaire = new Proprietaire(req.body);
        const proprietaireRegistered = await newProprietaire.save();
        // Retourne le propriétaire avec les détails des châteaux
        await proprietaireRegistered.populate('chateaux');
        res.status(200).json(proprietaireRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// ----------------------- RÉCUPERER les propriétaire --------------------- //
routerproprietaire.get('/', async (req, res) => {
    try {
        const proprietaire = await Proprietaire.find();
        res.status(200).json(proprietaire);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// -------------------- RÉCUPERER un propriétaire par ID ------------------ //
routerproprietaire.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: 'Propriétaire non trouvé' });
        }

        const proprietaire = await Proprietaire.findById(req.params.id).populate('chateaux');
        if (!proprietaire) return res.status(404).json({ error: 'Propriétaire non trouvé' });

        res.status(200).json(proprietaire);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// ------------------------ MODIFIER UN propriétaire ---------------------- //
routerproprietaire.put('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: 'Propriétaire non trouvé' });
        }

        const updatedProprietaire = await Proprietaire.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('chateaux');

        if (!updatedProprietaire) return res.status(404).json({ error: 'Propriétaire non trouvé' });

        res.status(200).json(updatedProprietaire);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// ------------------------ SUPPRIMER UN propriétaire ---------------------- //
routerproprietaire.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: 'Propriétaire non trouvé' });
        }

        const deletedProprietaire = await Proprietaire.findByIdAndDelete(req.params.id);
        if (!deletedProprietaire) return res.status(404).json({ error: 'Propriétaire non trouvé' });

        res.status(200).json(deletedProprietaire);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = routerproprietaire;