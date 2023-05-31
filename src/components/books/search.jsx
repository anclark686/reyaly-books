import { Jwt_auth } from "../auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

export const SearchBar = () => {
  const [search, setSearch] = useState("Select");
  const [searchVal, setSearchVal] = useState("");
  const [token, userProfile, refreshToken, axiosJWT] = Jwt_auth();
  const [, , email] = userProfile;
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line
  }, [email]);

  const searchDB = async (search, searchVal) => {
    const results = await axiosJWT.post(
      "https://reyaly-books-backend.herokuapp.com/search",
      {
        user: email,
        filter: search,
        value: searchVal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate("/searchResults", { state: { results: results.data } });
  };

  const getSearch = (id) => {
    const link = document.getElementById(id);
    setSearch(link.textContent);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      searchDB(search, searchVal);
    }
  };

  return (
    <InputGroup className="search-bar">
      <DropdownButton
        className="search-button"
        title={search}
        variant="info"
        id="input-group-dropdown-1"
      >
        <Dropdown.Item id="Title" onClick={() => getSearch("Title")}>
          Title
        </Dropdown.Item>
        <Dropdown.Item id="Author" onClick={() => getSearch("Author")}>
          Author
        </Dropdown.Item>
        <Dropdown.Item id="Genre" onClick={() => getSearch("Genre")}>
          Genre
        </Dropdown.Item>
        <Dropdown.Item id="Notes" onClick={() => getSearch("Notes")}>
          Notes
        </Dropdown.Item>
      </DropdownButton>
      <Form.Control
        className="search-input"
        aria-label="Text input with dropdown button"
        onChange={(e) => setSearchVal(e.target.value)}
        onKeyDown={handleEnter}
      />
      <Button
        variant="info"
        className="search-button"
        onClick={() => searchDB(search, searchVal)}
      >
        Search
      </Button>
    </InputGroup>
  );
};
