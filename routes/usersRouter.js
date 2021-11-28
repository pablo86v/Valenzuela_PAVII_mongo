const router = require ('express').Router();
const User = require ('./models/User');
const bcrypt = require('bcrypt');
const { verifyToken } = require("../utils/middlewares");

router.get('/', verifyToken,  async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) =>{
    try {
        const { userName, password} = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({userName, passwordHash});
        const userSaved = await user.save();
        
        res.status(201).json(userSaved);

    } catch (error) {
        next(error);
    }
})

module.exports = router;
