import './App.css';
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import LandingPage from "./screens/landing-page/landing-page";

const App = () => (
  <>
    <Header />
    <main>
      <LandingPage />
    </main>
    <Footer />
  </>
);

export default App;
