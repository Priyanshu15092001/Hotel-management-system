const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectToDb = require("./config/db");

const menuRoutes = require('./routes/menuRoutes')
const orderRoutes = require('./routes/orderRoutes')
const tableRoutes = require('./routes/tableRoutes')

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE" }));
app.use(express.json());

//routes

app.use('/api/menu',menuRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/tables',tableRoutes)

//connect to db and start server
connectToDb();
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
