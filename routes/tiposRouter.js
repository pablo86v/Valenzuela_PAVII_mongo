const router = require('express').Router();
const { verifyToken } = require("../utils/middlewares");
const Tipos = require('./models/Tipos');

router.use(verifyToken);


router.get('/', (req, res) => {
    Tipos.find().then(
        data => res.json(data)
    ).catch(
        err => res.send("error")
    )
});


module.exports = router;
