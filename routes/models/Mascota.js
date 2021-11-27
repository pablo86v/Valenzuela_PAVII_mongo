const mongoose = require ('mongoose');
const {model, Schema} = mongoose;

const mascotaSchema = new Schema({
    nombre: {type: String, required : true},
    tipo: {type : String, required : true}
});

mascotaSchema.set("toJSON", {
    transform:((document, mascotaToJSON) => {
        mascotaToJSON.id = mascotaToJSON._id.toString();
        delete mascotaToJSON._id; 
        delete mascotaToJSON.__v;
    })
})

module.exports = model("Mascota", mascotaSchema);


