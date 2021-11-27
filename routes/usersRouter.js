const router = require ('express').Router();
const User = require ('./models/User');
const bcrypt = require('bcrypt');

router.get('/',  async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) =>{
    try {
        const { username, password} = req.body;

        if(password.length !== 6){
            return next({name: "validationError", message: "No tiene 6 caracteres"});
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({username, passwordHash});
        const userSaved = await user.save();
        
        res.status(201).json(userSaved);

    } catch (error) {
        next(error);
    }
})

module.exports = router;
