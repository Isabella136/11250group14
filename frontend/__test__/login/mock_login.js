import React from 'react';
import { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../src/components/loading";
import ErrorMessage from "../../src/components/error_message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../src/actions/user_actions";

const LoginPage = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //dispatch calls reducer with user login request
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
      if(userInfo) {
        history.push("/mydata");
      }
    }, [history, userInfo]);

    const submitHandler = async (e) => {
      e.preventDefault();

      dispatch(login(email, password));
    };

    return (
      <div title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Don't have an account? <a href="/signup">Sign Up Here</a>
            </Col>
          </Row>
        </div>
      </div>
    );
};

export default LoginPage;
