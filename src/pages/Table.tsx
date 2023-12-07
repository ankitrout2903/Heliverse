import React from "react";
import SelectedUsersTable from "../components/SelectedUsersTable";
import { Container, Button } from "@mui/material";
import { useHistory } from "react-router";

const Table = () => {
    const history = useHistory()

    const handleClick = () => {
        history.push('/')
    }

  return (
    <Container>
        <Button variant="outlined" onClick={handleClick}>
        Go to Users
      </Button>
      <SelectedUsersTable />
    </Container>
  );
};

export default Table;
