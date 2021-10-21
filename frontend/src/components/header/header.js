import React, { useEffect } from "react";
import { Form, FormControl, Container, NavDropdown, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/user_actions";

const Header = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
      dispatch(logout());
      history.push("/");
    };

    useEffect(() => {}, [userInfo]);

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
              <Link to="/mydata">My Data</Link>
            </Nav.Link>
            <NavDropdown title="{userInfo.name}" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.3">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
              onClick={logoutHandler}
              >Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Header;
