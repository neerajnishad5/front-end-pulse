import UnassignedUsers from "./UnassignedUsers";
import AssignedUsersList from "./AssignedUsersList";
import { useState } from "react";

// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";

export default function SuperAdminHome() {
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target?.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#FEE1C7",
        }}
        className="input-group d-flex justify-content-center mb-3 p-3"
      >
        <div className="form-outline">
          <input
            type="search"
            id="search-focus"
            placeholder="Search"
            className="form-control"
            aria-label="Search"
            onChange={inputHandler}
          />
        </div>
        <button id="search-button" type="button" class="btn btn-success">
          <i class="fas fa-search">Search</i>
        </button>
      </div>
      <AssignedUsersList inputText={inputText} />
    </>
  );
}