import {Form, FormControl, Container, NavDropdown, Nav, Navbar} from 'react-bootstrap';
import {Link} from "react-router-dom";

const Header = () => {
    return (
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">CarbonZero</Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='m-auto'>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>
          </Nav>
          <Nav>
            <Nav.Link>
              <Link to="/mynotes">My Notes</Link>
            </Nav.Link>
            <NavDropdown title="Chance Onyiorah" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.3">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Header;
