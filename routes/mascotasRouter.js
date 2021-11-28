const router = require('express').Router();
const Mascota = require('./models/Mascota');
const { verifyToken } = require("../utils/middlewares");

router.use(verifyToken);

router.get('/:id', (req, res) => {
    Mascota.findOne({ _id: req.params.id }).then(
        data => res.json(data)
    ).catch(
        err => res.send("error")
    )
});

router.get('/', (req, res) => {
    Mascota.find().then(
        data => res.json(data)
    ).catch(
        err => res.send("error")
    )
});

router.post('/', (req, res) => {
    const { nombre, tipo, edad, vacunado, observaciones } = req.body;
    const mascota = new Mascota({ nombre, tipo, edad, vacunado, observaciones });
    mascota.save((err, data) => {
        if (err) {
            res.json({ ok: false, message: "No se pudo guardar la información." })
        } else {
            res.json({ ok: true, message: "Información guardada" })
        }
    })
});

router.put('/:id', (req, res, next) => {
    Mascota.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(mascotaModif => { 
            if (mascotaModif) {
                res.json(mascotaModif);
            }
            res.status(400).end();
        })
        .catch(err => {
            next(err);
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
            res.send(err);
        });
});

module.exports = router;
