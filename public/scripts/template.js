function layout(content){
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
            <li><a href="/">Home Page</a></li>
            <li><a href="/login">Log-in</a></li>
            <li><a href="/products">Products</a></li>
            <div class="nav-right">
                <li><a href="/cart">Cart</a></li>
            </div>
        </ul>
    </div>

        ${content}

</body>
</html>`;
}

function drawIndexPage(){

    let intro = `<div class="intro">
    <h1>Welcome to <br> <label class="name1">On</label>Store</h1>
    <p>Shopping made easy!</p>
</div>`;

    return layout(intro);
}

function drawLoginPage(){
    let content = `<main id="main-holder">
    <h1 id="login-header">Login</h1>
    
    <div id="login-error-msg-holder">
      <p id="login-error-msg">Invalid username <span id="error-msg-second-line">and/or password</span></p>
    </div>
    
    <form id="login-form">
      <input type="text" name="username" id="username-field" class="login-form-field" placeholder="Username">
      <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
      <input type="submit" value="Login" id="login-form-submit">
    </form>
  
  </main>
  <script defer src="login.js"></script>`;

    return layout(content);
}

module.exports = { drawIndexPage, drawLoginPage };