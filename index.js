require('./data/mongo');
const express = require('express');
const cors = require("cors"); 
const app = express();
const {handlerNotFound, handlerError} = require("./utils/middlewares"); 
const mascotasRouter = require('./routes/mascotasRouter');
const userRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');
const tiposRouter = require('./routes/tiposRouter');
const {PORT} = require('./utils/config');

app.use(express.json());
app.use(cors());  

app.use("/api/mascotas", mascotasRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/tipos", tiposRouter);
app.use(handlerNotFound); 
app.use(handlerError);  

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});