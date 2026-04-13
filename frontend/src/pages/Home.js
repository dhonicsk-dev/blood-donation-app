import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{
      background: "#dc3545",
      color: "white",
      padding: "80px 20px",
      textAlign: "center",
      borderRadius: "10px"
    }}>
      <Container>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
          🩸 Save Lives with Blood Donation
        </h1>
        <p style={{ fontSize: "18px", marginTop: "10px" }}>
          Find donors near you or become a donor today
        </p>

        <div style={{ marginTop: "20px" }}>
          <Button as={Link} to="/register" variant="light" className="me-3">
            Become Donor
          </Button>

          <Button as={Link} to="/donors" variant="dark">
            Find Blood
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Home;