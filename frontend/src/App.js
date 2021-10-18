import './App.css';
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import LandingPage from "./screens/landing_page/landing_page";
import LoginPage from "./screens/login_page/login_page";
import SignupPage from "./screens/signup_page/signup_page";

import MyNotes from "./screens/my_notes/my_notes";
import { Route, BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Route path='/' component={LandingPage} exact/>
      <Route path='/login' component={LoginPage} exact/>
      <Route path='/signup' component={SignupPage} exact/>
      <Route path ='/mynotes' component={MyNotes} exact />

    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
