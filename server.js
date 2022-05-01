const express = require('express');
const path = require('path');
const { readAndAppend, readFromFile } = require('./db/fsUtils');

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
    console.log(req.body);
    readAndAppend(req.body, path.join(__dirname, `/db/db.json`));
    res.sendStatus(201);
});

//404 route

app.get(`*`, (req, res) =>
    res.sendFile(path.join(__dirname, `/public/404.html`))
)

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port} 🚀`)
);
