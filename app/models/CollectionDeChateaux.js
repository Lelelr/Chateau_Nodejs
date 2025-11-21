const mongoose = require('mongoose');

const CollectionDeChateauxSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    // Liste des château
    chateau: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chateau',
        required: true
      }
    ],

    // Prix de la collection de châteaux
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CollectionDeChateaux', CollectionDeChateauxSchema);