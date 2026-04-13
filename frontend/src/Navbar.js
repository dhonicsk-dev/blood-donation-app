import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-dark bg-danger shadow">
      <div className="container d-flex justify-content-between">

        <Link className="navbar-brand fw-bold fs-4" to="/">
          🩸 Blood Portal
        </Link>

        <div className="d-flex align-items-center">
          {username && (
            <span className="text-white me-3">
              👤 {username}
            </span>
          )}

          <Link className="btn btn-light me-2" to="/donors">
            Donors
          </Link>

          <Link className="btn btn-light me-2" to="/register">
            Become Donor
          </Link>

          <button className="btn btn-dark" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;

<Navbar bg="dark" variant="dark" expand="lg" className="shadow">
  <Container>
    <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold" }}>
      🩸 Blood Connect
    </Navbar.Brand>

    <Nav className="ms-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/register">Donate</Nav.Link>
      <Nav.Link as={Link} to="/donors">Find Blood</Nav.Link>
    </Nav>
  </Container>
</Navbar>

{user ? (
  <>
    <span style={{ color: "white", marginRight: "10px" }}>{user}</span>
    <button onClick={logout}>Logout</button>
  </>
) : (
  <Nav.Link as={Link} to="/login">Login</Nav.Link>
)}

<Nav.Link as={Link} to="/register">Register</Nav.Link>