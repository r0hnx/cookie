import logo from "../logo.svg";

export const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        fontSize: "calc(10px + 2vmin)",
      }}
    >
      <img src={logo} className="App-logo" alt="logo" />
      Error 404 | Page Not Found
    </div>
  );
};
