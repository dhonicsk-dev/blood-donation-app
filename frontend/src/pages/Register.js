import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";

function Register() {
  // ✅ THIS WAS MISSING / WRONG
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    city: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/donor", form);

    alert("Donor Registered ✅");

    // ✅ reset form (this caused your error earlier)
    setForm({
      name: "",
      bloodGroup: "",
      city: ""
    });
  };

  return (
    <Card className="p-4 shadow">
      <h2 className="mb-3 text-center">🩸 Register as Donor</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Control
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="mb-3"
        />

        <Form.Control
          name="bloodGroup"
          placeholder="Blood Group"
          value={form.bloodGroup}
          onChange={handleChange}
          className="mb-3"
        />

        <Form.Control
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="mb-3"
        />

        <Button variant="danger" type="submit">
          Register
        </Button>
      </Form>
    </Card>
  );
}

export default Register;