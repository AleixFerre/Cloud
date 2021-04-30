// Imports
const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('../data/db.json');
const fs = require('fs');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Routes
app.get("/", (_req, res) => {
    res.json("Mejor accede a /info");
});

app.get("/info", (_req, res) => {
    res.send(db.todos);
});

app.post("/add", (req, res) => {

    const {
        name,
        description
    } = req.body;

    if (name && description) {
        db.todos.push({
            name: name,
            description: description
        });
        fs.writeFileSync('data/db.json', JSON.stringify(db));
        res.json("Succeeded! Todo added to database.");
    } else {
        res.json("Request denied. Fix format.");
    }

});

// Server
app.listen(app.get('port'), () => {
    console.log(`El servidor está escuchando en el puerto ${app.get('port')}!`);
});