const loginErrorMsg = document.getElementById("login-error-msg");

if (location.search == "?error=true") {
  loginErrorMsg.style.opacity = 1;
}
