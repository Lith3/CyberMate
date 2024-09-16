const http = require("http");

// Load environment variables from .env file
require("dotenv").config();

// Check database connection
require("./database/client").checkConnection();

// Import the Express application
const app = require("./app/config");

// Créer un serveur HTTP à partir d'Express
const server = http.createServer(app);

// Initialiser Socket.IO avec le serveur HTTP
// eslint-disable-next-line import/order
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL, // URL de votre frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Gérer les connexions Socket.IO
io.on("connection", (socket) => {
  console.info("New user : ", socket.id);

  socket.on("sendMessage", (data) => {
    io.emit("newMessage", data);
  });

  socket.on("disconnect", () => {
    console.info("User disconnected: ", socket.id);
  });
});

// Récupérer le port à partir des variables d'environnement
const port = process.env.APP_PORT;

// Utiliser `server.listen()` pour démarrer le serveur HTTP et Socket.IO
server.listen(port, () => {
  console.info(`Server is listening on port ${port}`);
});
