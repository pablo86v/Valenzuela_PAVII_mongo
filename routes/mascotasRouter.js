const router = require('express').Router();
const Mascota = require('./models/Mascota');
const { verifyToken } = require("../utils/middlewares");

router.use(verifyToken);

router.get('/:id', (req, res) => {
    Mascota.find({ _id: req.params.id }).then(
        data => res.json(data)
    ).catch(
        err => res.send("error")
    )
});

router.get('/', (req, res) => {
    Mascota.find().then(
        data => res.json({ data })
    ).catch(
        err => res.send(":(")
    )
});

router.post('/', (req, res) => {
    const { nombre, tipo } = req.body;
    const mascota = new Mascota({ nombre, tipo });
    mascota.save((err, data) => {
        if (err) {
            res.json({ ok: false, message: "No se pudo guardar la información." })
        } else {
            res.json({ ok: true, message: "Información guardada" })
        }
    })
});

router.delete("/:id", (req, res) => {
    Mascota.findByIdAndRemove(req.params.id).then((data) => {
        if (data) {
            res.json({ ok: true, message: "Eliminado." })
        }
        res.json({ ok: false, message: "No se pudo eliminar la información." })
    })
        .catch(err => {
            next(err);
        });
});

module.exports = router;
