import React from 'react';
import ReactDOM from 'react-dom';
import SignupPage from './mock_signup';
import { Provider } from "react-redux";
import store from '../../src/store';
const validatePassword = require("../../src/screens/signup_page/validatePassword");

describe("Signup form Page", () => {
  it("renders without crashing\n", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store = {store}><SignupPage /></Provider>, div);
  });
});

describe("Password Validation", () => {
  test("takes in same value for password and confirmPassword and returns null for errorMessage and accountCreated is true\n", () => {
    const password = "Testing123";
    const confirmPassword = "Testing123";

    expect(validatePassword(password, confirmPassword)).toStrictEqual([null, true]);
  });

  test("takes in different values for password and confirmPassword and returns 'Passwords do not match' errorMessage and accountCreated is false\n", () => {
    const password = "Testing123";
    const confirmPassword = "testing123";

    expect(validatePassword(password, confirmPassword)).toStrictEqual(["Passwords do not match", false]);
  });

  test("takes in password and confirmPassword with no uppercase letter or number and returns 'Password must contain at least one number, one uppercase letter, and one lowercase letter' errorMessage and accountCreated is false\n", () => {
    const password = "passwoord";
    const confirmPassword = "passwoord";

    expect(validatePassword(password, confirmPassword)).toStrictEqual(["Password must contain at least one number, one uppercase letter, and one lowercase letter", false]);
  });

  test("takes in password with less than 9 characters and different confirmPassword and returns 'Password must be at least 9 characters' errorMessage and accountCreated is false\n", () => {
    const password = "Pass1";
    const confirmPassword = "Pass12";

    expect(validatePassword(password, confirmPassword)).toStrictEqual(["Password must be at least 9 characters", false]);
  });

  test("No password is entered returns 'Password must be at least 9 characters' errorMessage and accountCreated is false\n", () => {
    const password = "";
    const confirmPassword = "";

    expect(validatePassword(password, confirmPassword)).toStrictEqual(["Password must be at least 9 characters", false]);
  });
});
