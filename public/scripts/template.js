const { Console } = require("console");
const productList = require("./products.js");

function layout(content, loggedIn) {
  let menu;
  let loggedInAs = ``;
  if (loggedIn) {
    menu = `<li><a href="/">Home Page</a></li>
        <li><a href="/products">Products</a></li>
        <div class="nav-right">
            <li><a href="/cart">Cart</a></li>
            <li><a href="/logout">Logout</a></li>
        </div>`;
    loggedInAs = `<h3>You are logged in as <label class='name1' id="emailLabel">${loggedIn}</label></h3>`;
  } else {
    menu = `<li><a href="/">Home Page</a></li>
        <li><a href="/login">Log-in</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="/products">Products</a></li>`;
  }
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/style.css">
    <title>Home Page - OnStore</title>
</head>
<body>
    <div class="navBar">
        <ul>
            ${menu}
        </ul>
    </div>
        ${loggedInAs}

        ${content}
    
</body>
</html>`;
}

function drawIndexPage(email) {
  let intro = `<div class="intro">
    <h1>Welcome to <br> <label class="name1">On</label>Store</h1>
    <p>Shopping made easy!</p>
</div>`;

  return layout(intro, email);
}

function drawLoginPage() {
  let content = `<main id="main-holder">
    <h1 id="login-header">Login</h1>
    
    <div id="login-error-msg-holder">
      <p id="login-error-msg">Invalid username <span id="error-msg-second-line">and/or password</span></p>
    </div>
    
    <form id="login-form" method="POST">
      <input type="text" name="email" id="username-field" class="login-form-field" placeholder="Username">
      <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
      <input type="submit" value="Login" id="login-form-submit">
    </form>
  
  </main>
  
  <script src='/scripts/loginErrorHandler.js'></script>`;

  return layout(content, 0);
}

function drawRegisterPage() {
  let content = `<main id="main-holder">
    <h1 id="login-header">Register</h1>
    
    <div id="login-error-msg-holder">
    <p id="login-error-msg" class='password-validation-error'>Passwords do not match.</p>
    <p id="login-error-msg" class='email-exists-error'>This email is taken.</p>
  </div>
  

    <form id="login-form" method="POST">
        <input name="email" type="email" placeholder="Enter your email" class="login-form-field" id="register_email"></input>
        <input name="pass" type="password" placeholder="Enter password" class="login-form-field" id="register_pass1"></input>
        <input name="confirmpass" type="password" placeholder="confirm password" class="login-form-field" id="register_pass2"></input>
        <input type="submit" id="register_submit"></input>
    
    </form>
    
    </main>
    
    <script src='/scripts/registerErrorHandler.js'></script>`;

  return layout(content, 0);
}

function drawProductsPage(data, loggedIn) {
  //  return layout(productList.buildProducts());
  return layout(AddProducts(data), loggedIn);
}

function AddProducts(data) {
  let table = `<form method="POST"><div class='grid-container'>`;

  data.forEach((product) => {
    table += `<div id='${product.id}' class='gridItem'><label class='productName'>${product.product_name}</label><br>`;
    table += `Price: ${product.price}$`;
    table += `</div>`;
  });

  table += `</div>
  </form>`;
  table += `<script src='./productsDom.js'></script>`;
  //console.log(table)
  return table;
}

function drawCart(email, cart) {
  let content = `<h2>You have <label class='name1'>${cart.length}</label> items in your cart.</h2>`;
  content += `<div class='cart'>`;

  cart.forEach((cartItem) => {
    content += `<div id='${cartItem.id}' class='gridItem'><label class='productName'>${cartItem.product_name}</label></div>`;
  });

  content += `</div>`;
  return layout(content, email);
}

function responseMessage(msg) {
  const content = `<main id="main-holder">div id="error-msg-holder">
    <p id="error-msg">${msg}</p>
  </div>
  <form method='POST'>
    <input type='submit' value='Go back'></input>
  </form>
  </main>`;
  return layout(content);
}

module.exports = {
  drawIndexPage,
  drawLoginPage,
  drawProductsPage,
  drawRegisterPage,
  drawCart,
  responseMessage,
};
