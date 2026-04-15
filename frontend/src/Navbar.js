import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  // ✅ Update when login/logout happens
  useEffect(() => {
    const checkUser = () => {
      setUser(localStorage.getItem("user"));
    };

    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // ✅ update UI immediately
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-dark bg-danger shadow">
      <div className="container d-flex justify-content-between">

        <Link className="navbar-brand fw-bold fs-4" to="/">
          🩸 Blood Portal
        </Link>

        <div className="d-flex align-items-center">

          {user && (
            <span className="text-white me-3">
              👤 {user}
            </span>
          )}

          <Link className="btn btn-light me-2" to="/donors">
            Donors
          </Link>

          <Link className="btn btn-light me-2" to="/register">
            Become Donor
          </Link>

          {user ? (
            <button className="btn btn-dark" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link className="btn btn-dark" to="/login">
              Login
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;