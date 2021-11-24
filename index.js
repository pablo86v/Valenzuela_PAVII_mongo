require('./data/mongo');
const express = require('express');
const mascotasRoutes = require('./routes/mascotasRoutes');
const app = express();
const port = 3000;

app.use(express.json());
app.use("/mascotas", mascotasRoutes);





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});