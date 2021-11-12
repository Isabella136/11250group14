import './App.css';
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import LandingPage from "./screens/landing_page/landing_page";
import LoginPage from "./screens/login_page/login_page";
import SignupPage from "./screens/signup_page/signup_page";
import MyGraph from "./screens/my_graph/my_graph";
import MyData from "./screens/my_data/my_data";
import RecommendationsPage from "./screens/recommendation_page/recommendation_page";
import { Route, BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Route path='/' component={LandingPage} exact/>
      <Route path='/login' component={LoginPage} exact/>
      <Route path='/signup' component={SignupPage} exact/>
      <Route path='/mydata' component={MyData} exact />
      <Route path='/mygraph' component={MyGraph} exact />
      <Route path='/recommendations' component={RecommendationsPage} exact />
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
