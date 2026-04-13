import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./App.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Donors from "./pages/Donors";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const [user, setUser] = React.useState(localStorage.getItem("user"));

React.useEffect(() => {
  setUser(localStorage.getItem("user"));
}, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">🩸 Blood Connect</Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/register">Donate</Nav.Link>
            <Nav.Link as={Link} to="/donors">Find Blood</Nav.Link>

            {user ? (
              <>
                <span style={{ color: "white", marginRight: "10px" }}>
                  {user}
                </span>
                <button className="btn btn-danger btn-sm" onClick={logout}>
  Logout
</button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Pages */}
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* 🔐 Protected routes */}
          <Route path="/donors" element={
            <ProtectedRoute>
              <Donors />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </Container>
    </>
  );
}

export default App;

<Route path="/register" element={<Register />} />