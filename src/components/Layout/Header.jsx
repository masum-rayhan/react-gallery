import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const Header = ({ selectedCount, onDelete }) => {
  return (
    <header className="gallery-header">
      {selectedCount === 0 ? (
        <>
          <h1>Gallery</h1>
          <hr />
        </>
      ) : (
        <div className="selected-header">
          <div className="check-icon-container">
            <FontAwesomeIcon icon={faCheckSquare} className="check-icon" />
          </div>
          <div className="selected-count">
            <h1>{`${selectedCount} Files${selectedCount > 1 ? "s" : ""} Selected`}</h1>
          </div>
        </div>
      )}
      {selectedCount > 0 && (
        <h1 className="delete-text" onClick={onDelete}>
          Delete files
        </h1>
      )}
    </header>
  );
};

export default Header;
