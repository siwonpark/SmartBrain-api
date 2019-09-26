const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 10;

const register = require('./controllers/handleRegister');
const signIn = require('./controllers/handleSignIn');
const image = require('./controllers/handleImage');
const profile = require('./controllers/handleProfile');

const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
        ssl: true,
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('working')})
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })



app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

