const multer = require('multer');

const storage = multer.diskStorage({
    // funzione che indica dove verrà salvato il file
    destination: function (req, file, cb) {
        cb(null, './public/movies-img')
    },
    // gestione del nome del file 
    filename: function (req, file, cb) {
        // viene assegnato all'immagine un valore numerico per evitare che le immagini
        // abbiano lo stesso nome
        const uniqueName = `${Date.now()} - ${Math.round(Math.random() * 1E9)} - ${file.originalname}`;
        cb(null, uniqueName);
    }

})


const upload = multer({ storage });

module.exports = upload;

// Date.now() => giorno e orario del file 