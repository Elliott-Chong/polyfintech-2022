import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

function Navbar() {
  const { state, logout } = useGlobalContext();
  const { user } = state;
  return (
    <nav className="px-28 py-4 items-center flex">
      <Link className="nav-link text-3xl" to="/">
        Portbonder
      </Link>
      <ul className="ml-auto flex items-center gap-4">
        {user && (
          <li>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
        )}
        {!user ? (
          <>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <button
              className="nav-link cursor-pointer"
              onClick={() => logout()}
            >
              Logout
            </button>
          </>
        )}
        {user && user.organisation && (
          <li>
            <Link to="cert-creation" className="nav-link">
              Register cert
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
