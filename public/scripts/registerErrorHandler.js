const passwordsMsg = document.getElementsByClassName(
  "password-validation-error"
)[0];
const emailMsg = document.getElementsByClassName("email-exists-error")[0];

if (location.search == "?error=passwords") {
  passwordsMsg.style.opacity = 1;
} else if (location.search == "?error=emailtaken") {
  emailMsg.style.opacity = 1;
}
