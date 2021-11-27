const { connect } = require('mongoose');
const {DB_URI} = require('../utils/config')

connect(DB_URI).then(
    res => console.log("Conectado ok")
).catch(
    console.error(DB_URI)
);