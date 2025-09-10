const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    nombre:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    rol:{type:String,enum:["doctor","paciente"], required: true},
    historial:[{fecha:String,descripcion:String}],
    medicina:[{nombre:String,dosis:String}]
});

module.exports = mongoose.model("User",userSchema);