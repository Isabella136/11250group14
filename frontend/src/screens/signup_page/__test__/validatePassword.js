function validatePassword(password, confirmPassword) {
    const validPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{9,}$");
    var errorMessage = null;
    var accountCreated = false;

    if(undefined !== password && password.length < 9) {
      errorMessage = "Password must be at least 9 characters";
    }

    else if(!validPassword.test(password)) {
      errorMessage = "Password must contain at least one number, one uppercase letter, and one lowercase letter";
    }

    else if(password !== confirmPassword) {
      errorMessage = "Passwords do not match";
    }

    else {
      accountCreated = true;
    }

    return [errorMessage, accountCreated];
}

module.exports = validatePassword;
