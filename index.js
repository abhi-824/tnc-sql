const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const port =  process.env.PORT ||3001;
const cors=require('cors')
const product_model = require("./routes/product/product_model");
const cart_model = require("./routes/cart/cart");
const user_model = require("./routes/user/user");
const order_model = require("./routes/order/order");
const wallet_model = require("./routes/wallet/wallet");
const bodyParser = require("body-parser");

app.use(cors('*'))
app.use(bodyParser.json());
app.use(function (req, res, next) {
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

app.delete("/cart/product/:userId/:productId", (req, res) => {
  if (!Number(req.params.userId))
    return res.status(400).json({ data: "Invalid Id;" });
  if (!Number(req.params.productId))
    return res.status(400).json({ data: "Invalid Id;" });
  cart_model
    .removeProductByUserId(
      Number(req.params.userId),
      Number(req.params.productId)
    )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/cart/products/:id", (req, res) => {
  if (!Number(req.params.id))
    return res.status(400).json({ data: "Invalid Id;" });
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
  if (!Number(req.params.id))
    return res.status(400).json({ data: "Invalid Id;" });
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
  console.log(req.body);
  product_model
    .createProduct(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/order/create/:uid/:pid", (req, res) => {
  if (!Number(req.params.uid))
    return res.status(400).json({ data: "Invalid Id;" });
  if (!Number(req.params.pid))
    return res.status(400).json({ data: "Invalid Id;" });

  order_model
    .createOrderByUserIdandProductId(
      Number(req.params.uid),
      Number(req.params.pid),
      Number(req.body.qty)
    )
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.get("/user/orders/:id", (req, res) => {
  if (!Number(req.params.id))
    return res.status(400).json({ data: "Invalid Id;" });
  user_model
    .getOrdersByUserId(Number(req.params.id))
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.patch("/user/:id", (req, res) => {
  if (!Number(req.params.id))
    return res.status(400).json({ data: "Invalid Id;" });
  user_model
    .updateUser(Number(req.params.id), req.body)
    .then((response) => {
      user_model
        .getUserById(Number(req.params.id))
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.get("/user/:id", (req, res) => {
  if (!Number(req.params.id))
    return res.status(400).json({ data: "Invalid Id;" });
  user_model
    .getUserById(Number(req.params.id))
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
var jsonParser = bodyParser.json();

app.post("/login/:id", jsonParser, (req, res) => {
  if (!Number(req.params.id))
    return res.status(400).json({ data: "Invalid Id;" });
  console.log(req.body);
  user_model
    .getUserById(Number(req.params.id))
    .then((response) => {
      console.log(response);
      if (response.password == req.body.password) {
        jwt.sign(
          { response },
          "privatekey",
          { expiresIn: "10h" },
          (err, token) => {
            if (err) {
              console.log(err);
            }
            res
              .status(200)
              .json({ data: "Successfully Logged In", token: token });
          }
        );
      } else res.status(401).json({ data: "Invalid Creds!" });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.get("/user/wallet/:id", (req, res) => {
  if (!req.params.id) return res.status(400).json({ data: "Invalid Id;" });
  wallet_model
    .getWalletByUserId(Number(req.params.id))
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.status ? error.status : 500).send(error);
    });
});
app.get("/auth/:token", (req, res) => {
  if (!req.params.token) return res.status(400).json({ data: "Invalid Id;" });
  jwt.verify(req.params.token, "privatekey", (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.status(403).json({ data: {} });
    } else {
      res.status(200).json({ data: authorizedData });
    }
  });
});
app.post("/register", (req, res) => {
  user_model
    .createUser(req.body)
    .then((response) => {
      return res.status(200).json({ data: response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.post("/cart/user/:uid/:pid", (req, res) => {
  if (!Number(req.params.uid))
    return res.status(400).json({ data: "Invalid Id;" });
  if (!Number(req.params.pid))
    return res.status(400).json({ data: "Invalid Id;" });
  console.log(req.body);
  cart_model
    .postProductByUserId(
      Number(req.params.uid),
      Number(req.params.pid),
      Number(req.body.quantity)
    )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.status ? error.status : 500).send(error);
    });
});
app.get("/view/myproducts/:uid", (req, res) => {
  if (!Number(req.params.uid))
    return res.status(400).json({ data: "Invalid Id;" });
  user_model
    .viewUserProducts(Number(req.params.uid))
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.status ? error.status : 500).send(error);
    });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
