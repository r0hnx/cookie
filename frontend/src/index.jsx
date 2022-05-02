import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./components/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Main } from "./components/Main";
import { NotFound } from "./components/NotFound";
import { Profile } from "./components/Profile";
import { AddCredentials } from "./components/AddCredentials";
import { Signup } from "./components/Signup";

const authLink = () => {
  // get the authentication token from local storage if it exists
  const data = JSON.parse(localStorage.getItem("data"));
  // return the headers to the context so httpLink can read them
  return data ? `Bearer ${data?.token}` : "";
};

const client = new ApolloClient({
  headers: {
    Authorization: authLink(),
  },
  uri: "http://localhost:5555",
  cache: new InMemoryCache(),
});

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/add" element={<AddCredentials />} />
          <Route path="/u/:username" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
