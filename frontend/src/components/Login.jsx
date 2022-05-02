import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Input, FormGroup, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../graphql/mutations";
import "../styles/Login.css";

export const Login = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("data")) navigate("/main");
  const [identifier, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data }] = useMutation(LOGIN);
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    try {
      login({ variables: { identifier, password } });
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err.message);
      navigate("/login");
    }
  };

  try {
    if (data?.login?.token !== undefined && data?.login?.token) {
      localStorage.setItem("data", JSON.stringify(data?.login));
      navigate("/main");
    }
    if (!window.location.hash) {
      window.location = window.location + "#app";
      window.location.reload();
    }
  } catch (err) {
    navigate("/login");
    console.log(err.message);
  }

  return (
    <div className="login">
      <div className="navigation">
        <span onClick={() => navigate("/")}>🔙</span>
        <h2 className="mb-5 banner">Cookie 🍪</h2>
        <span></span>
      </div>
      <Row form className="login_row">
        <Form inline action="/" onSubmit={submitHandler}>
          <FormGroup floating>
            <Input
              id="exampleEmail"
              name="identifier"
              placeholder="Email"
              type="identifier"
              onChange={onEmailChange}
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              onChange={onPasswordChange}
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>{" "}
          <Button block style={{ padding: "15px" }} type="submit">
            Login
          </Button>
        </Form>
      </Row>
    </div>
  );
};
