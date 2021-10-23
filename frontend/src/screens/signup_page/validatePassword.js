function validatePassword(password, confirmPassword) {
  //regex for password validaion
  const validPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{9,}$");
  var errorMessage = null;
  var createAccount = false;

  if(undefined !== password && password.length < 9) {
    errorMessage = "Password must be at least 9 characters";
  }

  else if(!validPassword.test(password)) {
    errorMessage = "Password must contain at least one number, one uppercase letter, and one lowercase letter";
  }

  else if(password !== confirmPassword) {
    errorMessage = "Passwords do not match";
  }
  //any error messages would result in no new user being created
  //page will display error message and wait for new input

  else {
    createAccount = true;
    //new user would be added to database here
  }

  return [errorMessage, createAccount];
}

module.exports = validatePassword;
