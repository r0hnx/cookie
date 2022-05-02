import NavBar from "./NavBar";

import "../styles/Main.css";
import { useNavigate } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_WEBSITES } from "../graphql/query";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Spinner,
} from "reactstrap";
import FetchPassword from "./FetchPassword";
import { Link } from "react-router-dom";

import React from "react";
import { DELETE } from "../graphql/mutations";

export const Main = () => {
  const { loading, error, data } = useQuery(GET_WEBSITES);
  const [deleteWebsite, { data: d }] = useMutation(DELETE);
  const user = JSON.parse(localStorage.getItem("data"));
  const { username, token } = user;
  const navigate = useNavigate();
  if (!token) navigate("/login");
  if (loading)
    return (
      <div className="loading">
        <Spinner />
      </div>
    );

  if (error) {
    if (error.message.length > 1)
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
  }

  if (!window.location.hash) {
    window.location = window.location + "#app";
    window.location.reload();
  }

  return (
    <>
      {data && (
        <>
          <NavBar />
          <div className="main">
            <div className="welcome">
              Welcome <b>@{username}</b> 🎂
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center header-info">
              {"Credentials Stored : " + data.getWebsites.length}
              <Link to="/add">
                <Button className="my-5">Add More Credentials</Button>
              </Link>
            </div>
            {data.getWebsites.map((website) => (
              <div className="website">
                <Card body key={website.id}>
                  <CardBody>
                    <div className="card-top">
                      <img
                        src={
                          "https://logo.clearbit.com/" +
                          website.website.substr(4)
                        }
                        alt={website.website}
                      />
                      <span
                        onClick={() => {
                          try {
                            deleteWebsite({ variables: { id: website.id } });
                            console.log(d);
                          } catch (err) {
                            console.log(err.message);
                          }
                          navigate("/main");
                        }}
                      >
                        ❎
                      </span>
                    </div>
                    <CardTitle tag="h5">
                      {website.website}{" "}
                      <a
                        style={{ fontSize: "medium" }}
                        href={"https://" + website.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        🔗
                      </a>
                    </CardTitle>
                    <CardSubtitle className="mb-2" tag="h6">
                      username : <b>{website.username}</b>
                    </CardSubtitle>
                    {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
                      password : {"**********"}
                    </CardSubtitle> */}
                    <CardText>
                      {website.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                      <br />
                      <small>
                        created on {new Date(website.createdAt).toDateString()}
                      </small>
                    </CardText>
                  </CardBody>
                  <FetchPassword
                    id={website.id}
                    password={website.password}
                    tag={website.tag}
                    key={`f${website.id}`}
                  />
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
