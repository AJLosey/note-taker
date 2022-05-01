const express = require('express');
const path = require('path');
const { readAndAppend, readFromFile, writeToFile } = require('./db/fsUtils');
const { fstat } = require('fs');
const { v4: uuidv4 } = require('uuid');

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
    req.body.id = uuidv4()
    readAndAppend(req.body, path.join(__dirname, `/db/db.json`));
    res.sendStatus(201);
});

app.get(`/api/notes`, (req, res) => {
    res.sendFile(path.join(__dirname, `/db/db.json`));
});

app.delete(`/api/notes/:title`, async (req, res) => {
    const data = await readFromFile(path.join(__dirname, `/db/db.json`)).then(JSON.parse)
    console.log('data: ', data);

    const deletedNoteIndex = data.findIndex((element) => element.title === req.params.title);
    data.splice(deletedNoteIndex, 1);
    writeToFile(path.join(__dirname, `/db/db.json`), data);
    res.sendStatus(200);
});

app.get(`/api/notes/:id`, async (req, res) => {
    const data = await readFromFile(path.join(__dirname, `/db/db.json`)).then(JSON.parse)
    console.log('data: ', data);

    const activeNoteData = data.find((element) => element.id === req.params.id);

    res.json(activeNoteData);
})

//404 route

app.get(`*`, (req, res) =>
    res.sendFile(path.join(__dirname, `/public/404.html`))
)

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port} 🚀`)
);
