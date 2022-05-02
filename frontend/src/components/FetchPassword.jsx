import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PASSWORD } from "../graphql/query";
import { Button, Container, Tooltip } from "reactstrap";

const FetchPassword = ({ id, password, tag }) => {
  const [tooltipOpen1, setTooltipOpen] = useState(false);
  const [tooltipText1, setTooltipText] = useState("Copy Password");
  const [show, setShow] = useState(true);
  const [getPassword, { loading, error, data }] = useLazyQuery(GET_PASSWORD, {
    variables: { id, password, tag },
  });
  if (error) {
    console.log(error);
    return <Button color="danger">⛔</Button>;
  }
  if (loading) return <Button color="warning">Decrypting ...</Button>;
  if (data && show)
    return (
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <code>{data?.getPassword}</code>
        <div className="options">
          <Button
            color="white"
            id="Password"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(data?.getPassword);
              setTooltipText("Copied ✅");
              setTimeout(() => {
                setTooltipText("Copy Password");
              }, 3000);
            }}
          >
            📑
          </Button>
          <Button
            color="white"
            id="Hide"
            onClick={(e) => {
              e.preventDefault();
              setShow(!show);
            }}
          >
            ❌
          </Button>
          <Tooltip
            isOpen={tooltipOpen1}
            placement="top"
            target="Password"
            toggle={() => {
              setTooltipOpen(!tooltipOpen1);
            }}
          >
            {tooltipText1}
          </Tooltip>
        </div>
      </Container>
    );
  return (
    <Button
      color="success"
      onClick={(e) => {
        e.preventDefault();
        data ? setShow(!show) : getPassword();
      }}
    >
      Show Password 🔑
    </Button>
  );
};

export default FetchPassword;
