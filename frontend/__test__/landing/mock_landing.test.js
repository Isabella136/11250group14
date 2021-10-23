import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './mock_landing';
import { Provider } from "react-redux";
import store from '../../src/store';

describe("Landing Page", () => {
  it("renders without crashing\n", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store = {store}><LandingPage /></Provider>, div);
  });
});
