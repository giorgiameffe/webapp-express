# 🎬 Cine Circle – Backend (`webapp-express`)
> Backend del progetto Cine Circle, un blog dedicato al cinema con estetica vintage.
    
Questa repository contiene la parte server-side dell’applicazione, sviluppata con **Express** e **MySQL**, che gestisce i dati e fornisce API RESTful al frontend (realizzato in React).

---

## 🧩 Stack Tecnologico

- **Node.js**
- **Express.js**
- **MySQL**
- **dotenv** → gestione delle variabili d’ambiente
- **cors** → comunicazione sicura con il frontend
- **multer** → gestione upload immagini

---

## 🏗️ Struttura del Progetto

```bash
webapp-express/
│
├── app.js                       # File principale del server Express
├── data/
│   └── db.js                    # Connessione al database MySQL
├── routers/
│   └── movies.js                # Rotte per film e recensioni
├── controllers/
│   └── movieController.js       # Logica CRUD per film e recensioni
├── middlewares/
│   ├── notFound.js              # Middleware 404
│   ├── handleErrors.js          # Middleware gestione errori
│   └── multer.js                # Middleware per upload immagini
├── public/                      # Cartella per immagini caricate
├── .env.example                 # Esempio di configurazione ambiente
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Setup del Progetto

1️⃣ **Clona la repository**
``` bash
git clone https://github.com/giorgiameffe/webapp-express.git
cd webapp-express
```

2️⃣ **Installa le dipendenze**
``` bash
npm install
```

3️⃣ **Configura le variabili d’ambiente**

Copia `.env.example` in un file `.env` locale e aggiorna i valori come necessario.

🔒 Solo il file .env.example è incluso nella repository; il file reale .env rimane privato e non tracciato.

4️⃣ **Avvio del server**
``` bash
npm run dev
```

Il server sarà disponibile su `http://localhost:3000` (o sulla porta definita nel tuo .env).

💡 Il comando npm run dev utilizza:
```bash
node --env-file=.env --watch app.js
```
Questo comando serve per caricare automaticamente le variabili dal .env e ricaricare il server ad ogni modifica dei file.

---

## 🧠 Funzionalità principali

- API RESTful per gestire film e recensioni
- Operazioni CRUD per i film e aggiunta di recensioni
- Upload immagini dei film tramite middleware multer
- Middleware per gestione CORS verso il frontend
- Middleware personalizzati per gestione degli errori e 404
- Connessione dinamica al database MySQL
- Struttura modulare e scalabile

---

## 🔗 Rotte principali

| Metodo | Endpoint                | Parametro | Descrizione                                                   |
| ------ | ----------------------- | --------- | ------------------------------------------------------------- |
| GET    | `/movies/`              | —         | Lista tutti i film. Supporta filtro `search`.                 |
| GET    | `/movies/:slug`         | `slug`    | Mostra i dettagli di un singolo film, incluse le recensioni.  |
| POST   | `/movies/`              | —         | Crea un nuovo film (upload immagine incluso).                 |
| POST   | `/movies/:slug/reviews` | `slug`    | Aggiunge una nuova recensione al film specificato dallo slug. |

---

## 🧰 Script disponibili

| Comando       | Descrizione                                                                   |
| ------------- | ----------------------------------------------------------------------------- |
| `npm run dev` | Avvia il server in modalità sviluppo con ricaricamento automatico (`--watch`) |

---

Questo backend fornisce tutte le API necessarie per il progetto **Cine Circle**.  
Per un’esperienza completa, consulta e collega il **frontend React** (`webapp-react`) del progetto: [Cine Circle Frontend](https://github.com/giorgiameffe/webapp-react).

---

## 👩‍💻 Autore
**Giorgia Meffe**  
Progetto personale realizzato con Express.