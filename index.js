const express = require("express");
const app = express();
const port = 3001;

const product_model = require("./routes/product/product_model");
const cart_model = require("./routes/cart/cart");
const user_model = require("./routes/user/user");
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/product", (req, res) => {
  product_model
    .getProducts()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/cart/products/:id", (req, res) => {
  cart_model
    .getProductsFromCartByUserId(Number(req.params.id))
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});
app.get("/product/:id", (req, res) => {
  product_model
    .getProductsById(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/product", (req, res) => {
  product_model
    .createProduct(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/user/orders/:id", (req, res) => {
  user_model
    .getOrdersByUserId(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
