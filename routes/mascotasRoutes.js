const router = require ('express').Router();
const Mascota = require ('./models/Mascota');

router.get('/:id', (req, res) => {
    Mascota.find({_id: req.params.id}).then(
        data => res.json(data)
    ).catch(
        err => res.json(err)
    )
});

router.get('/', (req, res) => {
    Mascota.find().then(
        data => res.json(data)
    ).catch(
        err => res.json(err)
    )
});

router.post('/', (req,res) => {
    const {nombre, tipo} = req.body;
    const mascota = new Mascota({nombre, tipo});
    mascota.save((err, data)=>{
        if(err) {
            res.json({ok : false, message : "No se pudo guardar la información."})
        }else{
            res.json({ok : true, message : "Información guardada"})
        }
    })
});

router.delete("/:id", (req, res) => {

    Mascota.findByIdAndRemove(req.params.id).then((result) => {
        if (result) {
            res.status(204).end();
        }
        res.status(404).end();
    })
        .catch(err => {
            next(err);
        });
});
module.exports = router;
