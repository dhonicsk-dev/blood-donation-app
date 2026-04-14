import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "",
    city: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Use environment variable instead of localhost
  const API = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    // ✅ Validation
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.bloodGroup ||
      !form.city ||
      !form.phone
    ) {
      alert("All fields required ❌");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/api/register`, form);

      alert("Registered Successfully ✅");
      navigate("/");

    } catch (err) {
      console.log(err.response?.data || err);
      alert("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: 400 }}>
        <h3 className="text-center mb-3">Register</h3>

        <input
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={handleChange}
        />

        <select
          name="bloodGroup"
          className="form-control mb-2"
          onChange={handleChange}
        >
          <option value="">Select Blood Group</option>
          <option>B+</option>
          <option>O+</option>
          <option>A+</option>
          <option>AB+</option>
          <option>B-</option>
          <option>O-</option>
          <option>A-</option>
          <option>AB-</option>
        </select>

        <input
          name="city"
          className="form-control mb-2"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          name="phone"
          className="form-control mb-2"
          placeholder="Phone"
          onChange={handleChange}
        />

        <button
          className="btn btn-success w-100"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <button
          className="btn btn-outline-primary w-100 mt-2"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Register;