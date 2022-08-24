import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

function Navbar() {
  const { state } = useGlobalContext();
  const { user } = state;
  return (
    <nav className="px-28 py-4 items-center flex">
      <Link className="nav-link text-3xl" to="/">
        Portbonder
      </Link>
      <ul className="ml-auto flex items-center gap-4">
        <li>
          <Link className="nav-link" to="/all">
            All
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        {!user && (
          <li>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
