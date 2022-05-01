const express = require('express');
const path = require('path');
const { readAndAppend, readFromFile, writeToFile } = require('./db/fsUtils');
const db = require(`./db/db`);
const { fstat } = require('fs');

const port = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.post(`/api/notes`, (req, res) => {
    readAndAppend(req.body, path.join(__dirname, `/db/db.json`));
    res.sendStatus(201);
});

app.get(`/api/notes`, (req, res) => {
    res.status(200).json(db);
});

app.delete(`/api/notes/:title`, (req, res) => {
    let i = 0;
    db.forEach(element => {
        if (element.title = req.params.title) {
            let newdb = db.splice(i, 1);
            writeToFile(path.join(__dirname, `/db/db.json`), newdb);
        };
        i++;
    })
    res.sendStatus(201);
});

app.get(`/api/activenote/:title`, (req, res) => {
    let i = 0;
    db.forEach(element => {
        if (element.title = req.params.title) {
            res.status(200).json(element);
        };
        i++;
    })
    res.sendStatus(201);
})

//404 route

app.get(`*`, (req, res) =>
    res.sendFile(path.join(__dirname, `/public/404.html`))
)

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port} 🚀`)
);
