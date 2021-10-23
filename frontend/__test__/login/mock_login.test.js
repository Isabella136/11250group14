import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './mock_login';
import { Provider } from "react-redux";
import store from '../../src/store';

describe("Login form Page", () => {
  it("renders without crashing\n", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store = {store}><LoginPage /></Provider>, div);
  });
});
