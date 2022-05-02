import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "../styles/AddCredentials.css";
import { CREATE } from "../graphql/mutations";
import NavBar from "./NavBar";

const letters =
  "abcdefghijklmnopqrstuvwxyz@#$%^&ABCDEFGHIJKLMNOPQRSTUVWXYZ*()_!~`-=+/.0123456789";

export const AddCredentials = () => {
  const [username, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [create, { data }] = useMutation(CREATE);
  const navigate = useNavigate();
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };
  const onRandomPassword = () => {
    const passwordField = document.getElementById("examplePassword");
    let randomPassword = "";
    for (let i = 0; i < 20; i++)
      randomPassword += letters[Math.floor(Math.random() * 64)];
    passwordField.value = randomPassword;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    try {
      const formData = {
        username,
        password,
        website,
        tags: [
          ...document.querySelector("#exampleSelectMulti").selectedOptions,
        ].map((e) => e.value),
      };
      // console.log(formData);
      create({ variables: formData });
      setEmail("");
      setPassword("");
      setWebsite("");
    } catch (err) {
      console.log(err.message);
      navigate("/add");
    }
  };

  try {
    if (data?.createWebsite !== undefined && data?.createWebsite)
      navigate("/main", { state: {} });
  } catch (err) {
    console.log(err.message);
    navigate("/add");
  }

  return (
    <>
      <NavBar />
      <div className="login">
        <div className="navigation">
          <span onClick={() => navigate("/main")}>🔙</span>
          <p className="mb-5 banner">Enter Credentials Below</p>
          <span></span>
        </div>
        <Row form className="login_row">
          <Form inline action="/" onSubmit={submitHandler}>
            <FormGroup floating>
              <Input
                id="exampleUsername"
                name="username"
                placeholder="Username"
                type="username"
                onChange={onEmailChange}
              />
              <Label for="exampleUsername">Username</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="text"
                onChange={onPasswordChange}
              />
              <Label for="examplePassword">Password</Label>
            </FormGroup>{" "}
            <Button
              block
              className="mb-3"
              style={{ padding: "15px" }}
              onClick={onRandomPassword}
            >
              Generate Random Password 🪄
            </Button>
            {/* <div className="random-gen mb-3">Generate Random Password</div> */}
            <FormGroup floating>
              <Input
                id="exampleWebsite"
                name="website"
                placeholder="www.example.com"
                type="text"
                onChange={onWebsiteChange}
              />
              <Label for="exampleWebsite">Website</Label>
            </FormGroup>{" "}
            <FormGroup>
              <Label for="exampleSelectMulti" className="white">
                Select Multiple Tags
              </Label>
              <Input id="exampleSelectMulti" multiple name="tags" type="select">
                <option>social</option>
                <option>work</option>
                <option>study</option>
                <option>dev</option>
                <option>personal</option>
              </Input>
            </FormGroup>{" "}
            <Button block style={{ padding: "15px" }} type="submit">
              Submit ✅
            </Button>
          </Form>
        </Row>
      </div>
    </>
  );
};
