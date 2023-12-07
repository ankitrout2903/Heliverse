import React from "react";
import { Card, CardContent } from "@mui/material";
import { UserData } from "../../types/userData";
import UserName from "./UserCard/UserName";
import UserProperties from "./UserCard/UserProperties";
import UserButton from "./UserCard/UserButton";
import './UserCard.css'

interface UserCardProps {
  user: UserData;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <Card
    sx={{
      margin: "8px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
    className="glass"
  >
    <CardContent>
      <UserName user={user} />
      <UserProperties user={user} />
      <UserButton user={user} />
    </CardContent>
  </Card>
);

export default UserCard;
