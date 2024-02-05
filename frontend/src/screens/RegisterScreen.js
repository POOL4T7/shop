import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormConatiner";
// import ReCaptcha from "../components/ReCaptcha";

const RegisterScreen = ({ location, history }) => {
  // const recaptchaRef = React.createRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);
  const submithandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      const google_recaptcha_token = ''; //await recaptchaRef.current.executeAsync();
      dispatch(register(name, email, password, google_recaptcha_token));
    }
  };
  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submithandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>confirmPassword</Form.Label>
            <Form.Control
              type="confirmPassword"
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Already have an account ?{" "}
            <Link to={redirect ? `/login?redirect?=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
      {/* <ReCaptcha recaptchaRef={recaptchaRef} /> */}
    </>
  );
};

export default RegisterScreen;
