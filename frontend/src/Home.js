import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{
      background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
      color: "white",
      padding: "100px 20px",
      textAlign: "center",
      borderRadius: "10px"
    }}>
      <h1>🩸 Blood Connect</h1>
      <p>Donate blood, save lives ❤️</p>

      <Button as={Link} to="/register" variant="light" className="me-3">
        Become Donor
      </Button>

      <Button as={Link} to="/donors" variant="dark">
        Find Blood
      </Button>
    </div>
  );
}

export default Home;