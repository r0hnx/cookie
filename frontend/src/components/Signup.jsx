import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Input, FormGroup, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../graphql/mutations";
import "../styles/Signup.css";

export const Signup = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("data")) navigate("/main");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { data, error }] = useMutation(REGISTER);
  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);
  const onUsernameChange = (event) => setUsername(event.target.value);
  const onConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);

  const submitHandler = (event) => {
    event.preventDefault();
    try {
      register({ variables: { username, password, email, confirmPassword } });
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err.message);
      navigate("/register");
    }
  };

  try {
    if (data?.register?.token !== undefined && data?.register?.token) {
      localStorage.setItem("data", JSON.stringify(data?.register));
      navigate("/main");
    }
    if (!window.location.hash) {
      window.location = window.location + "#app";
      window.location.reload();
    }
  } catch (err) {
    navigate("/register");
    console.log(err.message);
  }
  if (error) return `${error.message}`;

  return (
    <div className="register">
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
              name="email"
              placeholder="Email"
              type="email"
              onChange={onEmailChange}
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="exampleUsername"
              name="username"
              placeholder="@username"
              type="username"
              onChange={onUsernameChange}
            />
            <Label for="exampleUsername">Username</Label>
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
          <FormGroup floating>
            <Input
              id="exampleConfirmPassword"
              name="password"
              placeholder="Confirm Password"
              type="password"
              onChange={onConfirmPasswordChange}
            />
            <Label for="examplePassword">Confirm Password</Label>
          </FormGroup>{" "}
          <Button block style={{ padding: "15px" }} type="submit">
            Signup
          </Button>
        </Form>
      </Row>
    </div>
  );
};
