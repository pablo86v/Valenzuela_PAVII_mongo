const { connect } = require('mongoose');

connect('mongodb://localhost:27017/mascotas').then(
    res => console.log("Conectado ok")
).catch(
    console.error("Error de BD")
);