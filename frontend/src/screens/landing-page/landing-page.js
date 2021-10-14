import { Button, Container, Row } from "react-bootstrap";
import "./landing-page.css";

const LandingPage = () => {
    return <div className='main'>
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Carbon Zero</h1>
              <p className="subtitle">Track and reduce your carbon footprint.</p>
                <div className='buttonContainer'>
                  <a href="/login">
                    <Button size='lg' className='landingbutton'>Login</Button>
                  </a>
                  <a href="/signup">
                    <Button
                      size='lg'
                      className='landingbutton'
                      variant='outline-primary'
                    >
                      Sign Up</Button>
                  </a>
                </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>;
};

export default LandingPage;
