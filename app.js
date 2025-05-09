// express
const express = require('express');
const app = express();
const port = process.env.PORT;

// registrazione body-parser => decodificare il body per far sì che venga letto
app.use(express.json()); // in formato json

app.use(express.static('public'));

// routers
const moviesRouter = require('./routers/movies.js');

app.get('/', (req, res) => {
    res.send('Welcome to my Web App');
})

// movies
app.use('/movies', moviesRouter);

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})
