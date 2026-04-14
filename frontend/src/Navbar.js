import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const user = localStorage.getItem("user"); // ✅ correct key

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-dark bg-danger shadow">
      <div className="container d-flex justify-content-between">

        <Link className="navbar-brand fw-bold fs-4" to="/">
          🩸 Blood Portal
        </Link>

        <div className="d-flex align-items-center">

          {/* ✅ Show username only if logged in */}
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

          {/* ✅ Conditional buttons */}
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