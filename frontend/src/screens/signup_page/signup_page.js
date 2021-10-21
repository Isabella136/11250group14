import { useEffect, useState } from "react";
import MainScreen from "../../components/main_screen";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../components/loading";
import ErrorMessage from "../../components/error_message";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/user_actions";

const SignupPage = ({history}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userSignup = useSelector((state) => state.userSignup);
  const { loading, error, userInfo } = userSignup;

  useEffect(() => {
     if(userInfo) {
       history.push("/mydata");
     }
   }, [history, userInfo]);
  //regex for password validaion
  const validPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{9,}$");

  const submitHandler = async (e) => {
    e.preventDefault();

    if(password.length < 9) {
      setMessage("Password must be at least 9 characters");
    }

    else if(!validPassword.test(password)) {
      setMessage("Password must contain at least one number, one uppercase letter, and one lowercase letter");
    }

    else if(password !== confirmPassword) {
      setMessage("Passwords do not match");
    }

    else {
      dispatch(signup(name, email, password));
    }
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
