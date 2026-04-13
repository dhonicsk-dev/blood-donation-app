import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./App.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Donors from "./pages/Donors";

function App() {
  return (
    <>
      {/* 🔴 Navbar */}
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

      {/* 🔵 Page Content */}
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donors" element={<Donors />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;