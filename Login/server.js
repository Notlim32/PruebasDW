const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/ User");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware para procesar datos JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Base de datos temporal
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

//Rutas
app.post("/register",async(req,res)=>{
  try{
    const nuevoUsuario=new User(req.body);
    await nuevoUsuario.save();
    res.status(201).json({mensaje:"USUARIO CREADO", usuario : nuevoUsuario});
  }catch (err){
    res.status(400).json({error: err.message});
  }
})

app.post("/login",async(req,res)=>{
  const{email,password}= req.body;
  const usuario= await User.findOne({email,password});
  if(!usuario)
    return res.status(401).json({mensaje:"Usuario Incorrecto"});
  res.json({mensaje:"Login Exitoso",rol:usuario.rol, usuario});
})

// Iniciando

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
