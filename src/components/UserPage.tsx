import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setPage, setUsers } from "../redux/slice/userSlice";
import UserPagination from "./User/UserPagination";
import { RootState } from "../types/userData";
import { Button, Container } from "@mui/material";
import SearchFilter from "./SearchFilter";
import axios from "axios";
import { useHistory } from "react-router";

interface allFilters {
  domain: string[];
  gender: string[];
  availability: string[];
}

const UserTeam: React.FC = () => {
  const dispatch = useDispatch();
  const { searchQuery, filters, currentPage, users } = useSelector(
    (state: RootState) => state.user
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [maxPages, setMaxPages] = useState<number>(
    Math.ceil(users.length / 16)
  );
  const [allFilters, setAllFilters] = useState<allFilters>({
    domain: [],
    gender: [],
    availability: [],
  });
  const { deviceID } = useSelector((state: RootState) => state.device);
  const history = useHistory();

  console.log(deviceID);

  const handleSearch = () => {
    setLoading(true);
    dispatch(setPage(1));
    axios
      .get(import.meta.env.VITE_API_KEY + "/getUserList", {
        params: {
          searchQuery: searchQuery,
          gender: filters.gender,
          domain: filters.domain,
          available: filters.availability,
          page: currentPage,
          limit: 16,
        },
      })
      .then((res) => {
        dispatch(setUsers(res.data.userList));
        setMaxPages(res.data.maxPage);
        setLoading(false);
        console.log(res);
      });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    dispatch(setFilters({ ...filters, [filterType]: value }));
  };

  const handleClick = () => {
    history.push("/table");
  };

  const getAllFilters = () => {
    axios
      .get(import.meta.env.VITE_API_KEY + "/filters")
      .then((res) => {
        res.data = {
          genders: [
            "Female",
            "Male",
            "Agender",
            "Bigender",
            "Polygender",
            "Non-binary",
            "Genderfluid",
            "Genderqueer",
          ],
          domains: [
            "Sales",
            "Finance",
            "Marketing",
            "IT",
            "Management",
            "UI Designing",
            "Business Development",
          ],
        };

        const newFilters = {
          domain: res.data.domains,
          gender: res.data.genders,
          availability: ["true", "false"],
        };

        setAllFilters(newFilters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllFilters();
  }, []);

  return (
    <Container
      sx={{
        marginTop: "2rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button variant="outlined" onClick={handleClick}>
        Go to Teams
      </Button>

      <SearchFilter
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        filters={filters}
        handleFilterChange={handleFilterChange}
        allFilters={allFilters}
      />
      <UserPagination
        page={currentPage}
        loading={loading}
        setLoading={setLoading}
        maxPages={maxPages}
        setMaxPages={setMaxPages}
      />
    </Container>
  );
};

export default UserTeam;
