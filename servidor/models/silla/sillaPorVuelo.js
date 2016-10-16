const mongoose  = require('mongoose');
const crypto = require('crypto');

//Esquema de silla 
const sillaPorVueloSchema = new mongoose.Schema({
    
    silla:{type:Schema.Types.ObjectId, ref:'Sillas'},
    vuelo:{type:Schema.Types.ObjectId, ref:'Vuelos'},
    disponible:{type:Boolean, default:true}
   
}, { timestamps: true });



module.exports = mongoose.model('SillasPorVuelo', sillaPorVueloSchema);