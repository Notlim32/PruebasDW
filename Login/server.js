const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt =require("bcrypt");

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
    const{email,password}=req.body;
    const existente=await User.findOne({email});
    if(existente){
      return res.status(400).jason({error:"El correo ya fue registrado"})
    }

    const hashedPassword=await bcrypt.hash(password,10);
    const nuevoUsuario = new User({ ...req.body,
      password: hashedPassword,
    });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje:"Usuario Creado",usuario:nuevoUsuario});
  } catch(err){
    res.status(400).json({error:err.message});
  }
});
   

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const usuario = await User.findOne({ email });
    
    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no encontrado" });
    }
    
    const esValida = await bcrypt.compare(password, usuario.password);
   
    if (!esValida) {
      return res.status(401).json({ mensaje: "Contraseña Incorrecta" });
    }
    
    console.log(" Login exitoso");
    res.json({
      mensaje: "Login Exitoso",
      rol: usuario.rol,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el Login" });
  }
});
  

app.get("/api/users", async (req,res)=>{
  try{
    const users=await User.find();
    res.json(users);
  } catch (error){
    res.status(500).json({error: "Error al obtener usuario"});

  }
  
});
// Iniciando

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


//Ruta temporal para reset password
app.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const usuario = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    res.json({ mensaje: "Contraseña actualizada", email: usuario.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});