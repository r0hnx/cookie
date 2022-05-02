import "../styles/NavBar.css";
import { version } from "../../package.json";
import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const { username, token } = data ? data : {};
  return (
    <div>
      <nav>
        <div className="banner">
          <Link to="/">Cookie 🍪</Link>
        </div>
        <div className="events">
          <div className="version">v{version}</div>
          {data && token && (
            <>
              <div>
                <Link to={"/main"}>Main</Link>
              </div>
              <div>
                <Link to={"/u/" + username}>@{username}</Link>
              </div>
              <div>
                <Link
                  to="/"
                  onClick={() => {
                    setData(() => {
                      localStorage.removeItem("data");
                    });
                  }}
                >
                  Logout
                </Link>
              </div>
            </>
          )}
          {!data && (
            <>
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/register">Signup</Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
