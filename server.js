const express = require('express');
const path = require('path');

const port = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//404 route

app.get(`*`, (req, res) =>
    res.sendFile(path.join(__dirname, `/public/404.html`))
)

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port} 🚀`)
);
