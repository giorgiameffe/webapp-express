// express
const express = require('express');
const app = express();
const port = process.env.PORT;

const cors = require('cors');

//middlewares
const notFound = require('./middlewares/notFound.js');
const handleErrors = require('./middlewares/handleErrors.js');

// cors
app.use(cors({
    origin: process.env.FE_PATH
}));

// middleware public assests
app.use(express.static('public'));

// middleware body-parser => decodificare il body per far sì che venga letto
app.use(express.json()); // in formato json


// routers
const moviesRouter = require('./routers/movies.js');


app.get('/', (req, res) => {
    res.send('Welcome to my Web App');
})

// movies
app.use('/movies', moviesRouter);


// error 500
app.use(handleErrors);
// 404 not found
app.use(notFound);


app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})
