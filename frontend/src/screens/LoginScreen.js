import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormConatiner";
import ReCaptcha from "../components/ReCaptcha";

const LoginScreen = ({ location, history }) => {
  const recaptchaRef = React.createRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);
  const submithandler = async (e) => {
    e.preventDefault();
    const google_recaptcha_token = await recaptchaRef.current.executeAsync();
    dispatch(login(email, password, google_recaptcha_token));
  };
  return (
    <>
      <FormContainer>
        <h1>Sign in</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submithandler}>
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
          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ?
            <Link
              to={redirect ? `/register?redirect?=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
      <ReCaptcha recaptchaRef={recaptchaRef} />
    </>
  );
};

export default LoginScreen;
