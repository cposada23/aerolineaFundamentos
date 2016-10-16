const mongoose  = require('mongoose');
const crypto = require('crypto');

//Esquema de usuario 
const vueloSchema = new mongoose.Schema({
    
    temporada:{type:Schema.Types.ObjectId, ref:'Temporadas'},
    aeropuertoSalida:{type:Schema.Types.ObjectId, ref:'Aeropuertos'},
    aeropuertoLlegada:{type: Schema.Types.ObjectId, ref:'Aeropuertos'},
    precioBase:{type:Number, required:true},
    avion:{type:Schema.Types.ObjectId, ref:'Aviones'},
    temporada:{type:Schema.Types.ObjectId, ref:'Temporadas'}
   
}, { timestamps: true });



module.exports = mongoose.model('Vuelos', vueloSchema);