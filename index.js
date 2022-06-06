require("dotenv").config();
const PORT = process.env.PORT || 5000;
require("./config/db").connect();
const express = require('express');
const app = express();

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/product");
const orderRoute = require("./routes/product");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Wrong route!", error: true });
})

app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server started on :${PORT}`);
});

module.exports = {
	app
};