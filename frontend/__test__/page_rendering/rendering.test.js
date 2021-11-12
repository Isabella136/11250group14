import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from '../landing/mock_landing';
import SignupPage from '../signup/mock_signup';
import LoginPage from '../login/mock_login';
import { Provider } from "react-redux";
import store from '../../src/store';

describe("Landing Page", () => {
  it("renders without crashing\n", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store = {store}><LandingPage /></Provider>, div);
  });
});

describe("Signup form Page", () => {
  it("renders without crashing\n", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store = {store}><SignupPage /></Provider>, div);
  });
});

describe("Login form Page", () => {
  it("renders without crashing\n", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store = {store}><LoginPage /></Provider>, div);
  });
});
