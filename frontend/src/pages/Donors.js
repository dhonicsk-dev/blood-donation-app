import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Form } from "react-bootstrap";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [blood, setBlood] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/donors")
      .then(res => {
        setDonors(res.data);
        setFiltered(res.data);
      });
  }, []);

  useEffect(() => {
    let result = donors;

    if (blood) {
      result = result.filter(d => d.bloodGroup === blood);
    }

    if (city) {
      result = result.filter(d =>
        d.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    setFiltered(result);
  }, [blood, city, donors]);

  return (
    <div>
      <h2 className="mb-3">🩸 Available Donors</h2>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Select onChange={(e) => setBlood(e.target.value)}>
            <option value="">All Blood Groups</option>
            <option>A+</option><option>B+</option>
            <option>O+</option><option>AB+</option>
            <option>A-</option><option>B-</option>
            <option>O-</option><option>AB-</option>
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Control
            placeholder="Search by city..."
            onChange={(e) => setCity(e.target.value)}
          />
        </Col>
      </Row>

      {/* Donor Cards */}
      <Row>
        {filtered.map((d, i) => (
          <Col md={4} key={i}>
            <Card className="p-3 mb-3 shadow-sm text-center">
              <h5>{d.name}</h5>
              <h3 style={{ color: "#dc3545" }}>{d.bloodGroup}</h3>
              <p>📍 {d.city}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Empty State */}
      {filtered.length === 0 && (
        <h5>No donors found 😔</h5>
      )}
    </div>
  );
}

export default Donors;