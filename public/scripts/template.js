const productList = require("./products.js");

function layout(content, loggedIn) {
    let menu;
    let loggedInAs = ``;
    if (loggedIn){
        menu = `<li><a href="/">Home Page</a></li>
        <li><a href="/products">Products</a></li>
        <div class="nav-right">
            <li><a href="/cart">Cart</a></li>
            <li><a href="/logout">Logout</a></li>
        </div>`;
        loggedInAs = `<h3>You are logged in as <label class='name1'>${loggedIn}</label></h3>`;
    }else {
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
  
  </main>`;

    return layout(content, 0);
}

function drawRegisterPage(){
    let content = `<main id="main-holder">
    <h1 id="login-header">Register</h1>
    
    <form id="login-form" method="POST">
        <input name="email" type="text" placeholder="Enter your email" class="login-form-field" id="register_email"></input>
        <input name="pass" type="password" placeholder="Enter password" class="login-form-field" id="register_pass1"></input>
        <input name="confirmpass" type="password" placeholder="confirm password" class="login-form-field" id="register_pass2"></input>
        <input type="submit" id="register_submit"></input>
    
    </form>
    
    </main>`;

    return layout(content, 0);
}

function drawProductsPage(loggedIn){
    return layout(productList.buildProducts(), loggedIn);
}


module.exports = { drawIndexPage, drawLoginPage, drawProductsPage, drawRegisterPage };