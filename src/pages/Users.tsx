import React from "react";
import UserTeam from "../components/UserPage";

const Users = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>TEAMS Management App</h1>
      <UserTeam />
    </div>
  );
};

export default Users;
