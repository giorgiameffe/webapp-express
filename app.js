// express
const express = require('express');
const app = express();
const port = process.env.PORT;

// routers
const moviesRouter = require('./routers/movies.js');

app.get('/', (req, res) => {
    res.send('Welcome to my Web App');
})

// movies
app.use('/api/movies', moviesRouter);

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})
