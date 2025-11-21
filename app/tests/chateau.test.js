// Import des modules nécessaires
const request = require('supertest'); // Tester les routes HTTP de l'API
const express = require('express');   // Créer une instance d'application express
const mongoose = require('mongoose'); // Intéragir avec MongoDB
const Chateau = require('../models/Chateau'); // Modèle Mongoose Château
const chateauRouter = require('../routes/chateau'); // Routeur des châteaux
const { connect, closeDatabase, clearDatabase } = require('./test-db'); // Gérer la BDD de test


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
//------------------------------------------------------------------------------------------>



//------------------------------- Suite de tests pour château ------------------------------>
describe('CRUD Château', () => {

  // Test de création d'un château
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

        // Envoi de la requête POST à l'API
        const res = await request(app)
            .post('/api/chateaux')
            .send(data);

        // Vérifications
        expect(res.statusCode).toBe(200);             // Doit retourner 200 OK
        expect(res.body.nom).toBe(data.nom);          // Doit y avoir 1 château
        expect(res.body.surface).toBe(data.surface);  // Le nom doit correspondre
    });



    // Test pour récupérer tous les châteaux
    it('Récupérer tous les châteaux', async () => {
      // Créer un château dans la BDD
        const chateau = new Chateau({ nom: 'Château A' });
        await chateau.save();

        // Requête GET pour récuperer tous les châteaux
        const res = await request(app).get('/api/chateaux');

        // Vérifications
        expect(res.statusCode).toBe(200);             // Doit retourner 200 OK
        expect(res.body.length).toBe(1);              // Doit y avoir 1 château
        expect(res.body[0].nom).toBe('Château A');    // Le nom doit correspondre
    });



    // Test pour modifier un château
    it('Modifier un château', async () => {
      // Créer un château dans la BDD
        const chateau = new Chateau({ nom: 'Château B' });
        await chateau.save();

        // Requête PUT pour modifier le nom
        const res = await request(app)
            .put(`/api/chateaux/${chateau._id}`)
            .send({ nom: 'Château B Modifié' });

        // Vérifications
        expect(res.statusCode).toBe(200);               // Doit retourner 200 OK
        expect(res.body.nom).toBe('Château B Modifié'); // Le nom doit être modifié
    });



    // Test pour supprimer un château
    it('Supprimer un château', async () => {
      // Créer un château dans la BDD
        const chateau = new Chateau({ nom: 'Château C' });
        await chateau.save();

        // Requête DELETE
        const res = await request(app).delete(`/api/chateaux/${chateau._id}`);

        // Vérifications
        expect(res.statusCode).toBe(200);               // Doit retourner 200 OK
        expect(res.body.message).toBe('Château supprimé avec succès');  // Message de succès

        const find = await Chateau.findById(chateau._id);
        expect(find).toBeNull();
    });

});
//------------------------------------------------------------------------------------------>