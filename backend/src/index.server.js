const express = require("express");
const env = require("dotenv");
const app = express(); //crea la app
const mongoose = require("mongoose");
const path = require('path')
const cors = require('cors')


//rutas
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/categoria')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/admin/initialData')
const pageRoutes = require('./routes/admin/page')
//variable de entorno
env.config();
//conexion a mongo db
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.5vkcn.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    // `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.cxwa7.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify : false
    }
  )
  .then(() => {
    console.log("Conectado a la BD");
  });

app.use(cors())
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)
app.use('/api', initialDataRoutes)
app.use('/api', pageRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
