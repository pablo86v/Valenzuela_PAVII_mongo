const router = require ('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require ('./models/User');
const {SECRET} = require('../utils/config');

router.post("/", async (req,res, next) => {
    try {
		console.log(req.body);
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        const correctPass = user === null ? false : await bcrypt.compare(password, user.passwordHash);

        if(!correctPass){
          return next({name:"ValidationError", message:"Los datos ingresados son incorrectos."});
        }
		
        const userToken= {userName: user.userName, id: user._id}
        const token = await jwt.sign(userToken, SECRET);

        res.status(200).send(token)

    } catch (error) {
        next(error);
    }
})

module.exports = router;
