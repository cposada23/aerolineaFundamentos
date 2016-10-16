const mongoose  = require('mongoose');
const crypto = require('crypto');

//Esquema de silla 
const sillaSchema = new mongoose.Schema({
    numero:{type:String, required:true},
    tipo:{type:String, required:true},
    avion:{type:Schema.Types.ObjectId, ref:'Aviones'}
   
}, { timestamps: true });



module.exports = mongoose.model('Sillas', sillaSchema);