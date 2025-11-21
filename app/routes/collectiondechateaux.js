const express = require('express');
const routercollection = express.Router();
const CollectionDeChateaux = require('../models/CollectionDeChateaux');



// ------------------------- CRÉER une collection ------------------------- //
routercollection.post('/', async (req, res) => {
  try {
    const newCollectionDeChateaux = new CollectionDeChateaux(req.body);
    const collectiondechateauxSaved = await newCollectionDeChateaux.save();
    await collectiondechateauxSaved.populate('chateaux');
    res.status(201).json(collectiondechateauxSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// ----------------------- RÉCUPERER une collection ----------------------- //
routercollection.get('/', async (req, res) => {
  try {
    const collectiondechateaux = await CollectionDeChateaux.find().populate('chateaux');
    res.status(200).json(collectiondechateaux);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// -------------------- RÉCUPERER une collection par ID ------------------- //
routercollection.get('/:id', async (req, res) => {
  try {
    const collectiondechateaux = await CollectionDeChateaux.findById(req.params.id).populate('chateaux');
    if (!collectiondechateaux) {
      return res.status(404).json({ error: 'Collection de châteaux non trouvé' });
    }
    res.status(200).json(collectiondechateaux);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// --------------------- MODIFIER une collection par ID ------------------- //
routercollection.put('/:id', async (req, res) => {
  try {
    const updatedCollectionDeChateaux = await CollectionDeChateaux.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('chateaux');
    if (!updatedCollectionDeChateaux) {
      return res.status(404).json({ error: 'Collection de châteaux non trouvé' });
    }
    res.status(200).json(updatedCollectionDeChateaux);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// ------------------------ SUPPRIMER une collection ---------------------- //
routercollection.delete('/:id', async (req, res) => {
  try {
    const deletedCollectiondeChateaux = await CollectionDeChateaux.findByIdAndDelete(req.params.id);
    if (!deletedCollectionDeChateaux) {
      return res.status(404).json({ error: 'Collection de châteaux non trouvé' });
    }
    res.status(200).json(deletedCollectiondeChateaux);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = routercollection;
