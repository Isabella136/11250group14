import React, { useEffect } from "react";
import { Form, FormControl, Container, NavDropdown, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/user_actions";

const Header = (setSearch) => {
  const dispatch = useDispatch();
  const history = useHistory();

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
            {userInfo ? (
              <>
                <Nav.Link href="/mydata">My Data</Nav.Link>
                <Nav.Link href="/mygraph">My Graph</Nav.Link>
                <NavDropdown title={`${userInfo.name}`} id="collasible-nav-dropdown">
                  <NavDropdown.Item
                  onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
