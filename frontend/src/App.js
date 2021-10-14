import './App.css';
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import LandingPage from "./screens/landing-page/landing-page";
import MyNotes from "./screens/my-notes/my-notes";
import { Route, BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Route path='/' component={LandingPage} exact/>
      <Route path='/mynotes' component={() => <MyNotes />} />
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
