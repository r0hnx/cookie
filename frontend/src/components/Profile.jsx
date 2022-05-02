import NavBar from "./NavBar";
import "../styles/Profile.css";
export const Profile = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  if (!data) return `User Not FOund!`;

  const { username, token, email, id } = data;

  return (
    <>
      <NavBar />{" "}
      {token && (
        <div className="profile">
          <div className="avatar">
            <img
              style={{ height: "150px", width: "150px" }}
              src={"https://avatars.dicebear.com/api/identicon/" + id + ".svg"}
              alt="avatar"
            />
          </div>
          <div className="username">@{username}</div>
          <div className="email">{email}</div>
        </div>
      )}
    </>
  );
};
