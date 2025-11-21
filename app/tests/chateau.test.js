// Import des modules nécessaires
const request = require('supertest'); // Tester les routes HTTP de l'API
const express = require('express');   // Créer une instance d'application express
const mongoose = require('mongoose'); // Intéragir avec MongoDB
const Chateau = require('../models/Chateau'); // Modèle Mongoose Château
const chateauRouter = require('../routes/chateau'); // Routeur des châteaux
const { connect, closeDatabase, clearDatabase } = require('./test-db'); // Gérer la DB de test


// Création d'une application Express pour tester les routes
const app = express();
app.use(express.json()); // Permettre à Express de passer le JSON dans le body
app.use('/api/chateaux', chateauRouter);  // Monte le routeur pour les routes


//-------------------------------- Gérer la base de données -------------------------------->
beforeAll(async () => {
    await connect();
});


// Vider toutes les collections après chaque test
afterEach(async () => {
    await clearDatabase();
});

// Fermer connexion et arrêter serveur après tous les test
afterAll(async () => {
    await closeDatabase();
});

//------------------------------- Suite de tests pour château ------------------------------>
describe('CRUD Château', () => {

    it('Créer un château', async () => {
        const data = {
            nom: 'Château Test',
            type: 'Château',
            style: 'Renaissance',
            date_construction: '1682',
            surface: 2000,
            description: 'Superbe château test',
            statut: 'Habité',
            prix: 1500000
        };

        const res = await request(app)
            .post('/api/chateaux')
            .send(data);

        expect(res.statusCode).toBe(200);
        expect(res.body.nom).toBe(data.nom);
        expect(res.body.surface).toBe(data.surface);
    });

    it('Récupérer tous les châteaux', async () => {
        const chateau = new Chateau({ nom: 'Château A' });
        await chateau.save();

        const res = await request(app).get('/api/chateaux');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].nom).toBe('Château A');
    });

    it('Modifier un château', async () => {
        const chateau = new Chateau({ nom: 'Château B' });
        await chateau.save();

        const res = await request(app)
            .put(`/api/chateaux/${chateau._id}`)
            .send({ nom: 'Château B Modifié' });

        expect(res.statusCode).toBe(200);
        expect(res.body.nom).toBe('Château B Modifié');
    });

    it('Supprimer un château', async () => {
        const chateau = new Chateau({ nom: 'Château C' });
        await chateau.save();

        const res = await request(app).delete(`/api/chateaux/${chateau._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Château supprimé avec succès');

        const find = await Chateau.findById(chateau._id);
        expect(find).toBeNull();
    });

});
