const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const errorsData = require('../utils/errors.json');

const handlerNotFound = (req, res) => {
    res.status(404).json({error: "No existe esa ruta."});
};

const handlerError = (error, req, res, next)=>{
    console.error(error);
    const err = errorsData.find(e => e.name === error.name);
    if(err){
        res.status(err.code).send({error: error.name, message: err.message ? err.message : error.message});
    }else{
        res.status(500).send({error:"Error interno del sistema"});
    }
    next(error);
};

const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers["authorization"];  
    if (bearerToken) { 
        req.token = bearerToken.split(' ')[1];
        try {
            const data = await jwt.verify(req.token, SECRET);
            next();  
        }
        catch (error) {
             next(error);
        }
    }
    else {
        next({ name: "ErrorToken", message: "No Token" });
    }
};

module.exports = {
    handlerNotFound, 
    handlerError,
    verifyToken
};