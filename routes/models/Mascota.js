const mongoose = require ('mongoose');
const {model, Schema} = mongoose;

const mascotaSchema = new Schema({
    nombre: {type: String, required : true},
    tipo: {type : String, required : true}
});


module.exports = model("Mascota", mascotaSchema);


