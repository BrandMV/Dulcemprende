const express = require("express");
const env = require("dotenv");
const app = express(); //crea la app
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//variable de entorno
env.config();

//rutas
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')


//conexion a mongo db
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.cxwa7.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Conectado a la BD");
  });

app.use(bodyParser());
app.use('/api', authRoutes)
app.use('/api', adminRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
