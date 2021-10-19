import { useEffect, useState } from "react";
import MainScreen from "../../components/main_screen";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/loading";
import ErrorMessage from "../../components/error_message";
import axios from "axios";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //regex for password validaion
  const validPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{9,}$");

  const submitHandler = async (e) => {
    e.preventDefault();

    if(!validPassword.test(password)) {
      setMessage("Password must be at least 9 characters\nPassword must contain at least one number, one uppercase letter, and one lowercase letter");
    }

    else if(password !== confirmPassword) {
      setMessage("Passwords do not match");
    }

    else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { data } = await axios.post(
          "/api/users",
          { name, email, password },
          config
        );

        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
      catch (error) {
        setError(error.response.data.message);
      }
    }
    //else {

    //}
  };

  return (
    <MainScreen title="SIGN UP">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

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

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Already have an account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default SignupPage;
