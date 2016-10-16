const mongoose  = require('mongoose');
const crypto = require('crypto');

//Esquema de tikete 
const tiketeSchema = new mongoose.Schema({
   puestoPorVuelo:{type:Schema.Types.ObjectId, ref:'SillasPorVuelo'},
   estado:{type:String},
   precio:{type:Number,required:true},
   compra:{type:Schema.Types.ObjectId, ref:'Compras'},
   
   
}, { timestamps: true });



module.exports = mongoose.model('Tiketes', tiketeSchema);