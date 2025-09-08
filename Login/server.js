const express = require("express");
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
