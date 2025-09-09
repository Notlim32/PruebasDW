const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware para procesar datos JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// "Base de datos" temporal
const USERS = {
  usuario: "1234", // usuario: contraseña
  admin: "adminpass"
};
// Conexión a base de datos Mongo
mongoose.connect("mongodb://127.0.0.1:27017/miLogin",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("conectado a MongoDB"))
.catch(err=> console.error("Error al conectar: ",err))

// Ruta para procesar login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (USERS[username] && USERS[username] === password) {
    res.json({ success: true, message: "Inicio de sesión exitoso ✅" });
  } else {
    res.json({ success: false, message: "Usuario o contraseña incorrectos ❌" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
