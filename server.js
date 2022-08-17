const express = require("express");
const cookieParser = require("cookie-parser");
const templates = require("./public/scripts/template.js");
const db = require("./database/connection.js");
const PORT = 4000;

const server = express();

server.use(express.static("./public"));
server.use(express.static("./public/scripts"));
server.use(express.urlencoded());
server.use(cookieParser());

server.get("/", (req, res) => {
  res.send(templates.drawIndexPage(req.cookies.email));
});

server.get("/login", (req, res) => {
  res.send(templates.drawLoginPage());
});

server.post("/login", (req, res) => {
  const data = req.body;
  db.query(`SELECT * FROM shop_users where email=$1 AND password=$2`, [
    data.email,
    data.password,
  ]).then((result) => {
    if (result.rows.length > 0) {
      res.cookie("email", data.email);
      res.redirect("/");
    } else {
      res.redirect("/login?error=true");
    }
  });
});

server.get("/logout", (req, res) => {
  res.clearCookie("email");
  res.redirect("/");
});

server.get("/products", (req, res) => {
  // bring db to here
  // var data
  db.query("SELECT * FROM products").then((result) => {
    console.log(result.rows);
    res.send(templates.drawProductsPage(result.rows, req.cookies.email));
  });
});

server.post("/products", (req, res) => {
  if (!req.cookies.email) {
    console.log("You need to be logged in to perform this action");
    res.redirect("/login");
  } else {
    db.query(
      `SELECT id FROM shop_users WHERE email='${req.cookies.email}'`
    ).then((result) => {
      const userId = result.rows[0].id;
      db.query(`INSERT INTO cart (product_name,userid) values($1, $2)`, [
        req.body.productName,
        userId,
      ]).then((result2) => {
        console.log("Product has been added to the cart.");
      });
    });
  }
});

server.get("/register", (req, res) => {
  res.send(templates.drawRegisterPage());
});

server.post("/register", (req, res) => {
  const data = req.body;
  if (data.pass !== data.confirmpass) {
    res.status(404).redirect("/register?error=passwords");
  } else {
    db.query(`SELECT * FROM shop_users WHERE email=$1`, [data.email]).then(
      (result) => {
        if (result.rows.length > 0) {
          res.status(404).redirect("/register?error=emailtaken");
        } else {
          db.query(`INSERT INTO shop_users (email, password) values($1,$2)`, [
            data.email,
            data.pass,
          ]).then((result) => {
            res.cookie("email", data.email);
            console.log("Account has been created, redirecting to home page.");
            res.redirect("/");
          });
        }
      }
    );
  }
});

server.get("/cart", (req, res) => {
  const email = req.cookies.email;
  db.query(`SELECT id FROM shop_users WHERE email=$1`, [email]).then(
    (result) => {
      const userId = result.rows[0].id;
      db.query(`SELECT * FROM cart WHERE userid=$1`, [userId]).then(
        (result2) => {
          console.log(result2.rows);
          res.send(templates.drawCart(email, result2.rows));
        }
      );
    }
  );
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
