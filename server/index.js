const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/products/productsRoute");
const authRouter = require("./routes/auth/authRoute");
const orderRoute = require("./routes/order/orderRoute")
const cors = require("cors");

const app = express();
const port = 3030;

mongoose
  .connect("mongodb+srv://kaychik:52oputih@cluster0.1pefs.mongodb.net/shop")
  .then(() => {
    console.log("Connected to MongoDB successful!");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(express.json());
app.use("/product", productRouter);
app.use("/auth", authRouter);
app.use("/order" , orderRoute)

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
