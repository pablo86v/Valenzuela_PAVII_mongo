const mongoose = require ('mongoose');
const {model, Schema} = mongoose;

const tiposSchema = new Schema({
    id: {type: String, required : true},
    desc: {type : String, required : true}
});

tiposSchema.set("toJSON", {
    transform:((document, tiposToJSON) => {
        tiposToJSON.id = tiposToJSON._id.toString();
        delete tiposToJSON._id; 
        delete tiposToJSON.__v;
    })
})

module.exports = model("Tipo", tiposSchema);


