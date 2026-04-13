import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterDonor() {
  const [form, setForm] = useState({
    bloodGroup: "",
    city: ""
  });

  const navigate = useNavigate();
  const API = "http://localhost:5000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(`${API}/api/donors`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate("/donors");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow col-md-6 mx-auto">

        <h3 className="text-danger text-center mb-4">
          ❤️ Become a Donor
        </h3>

        <form onSubmit={handleSubmit}>

          <select
            name="bloodGroup"
            className="form-control mb-3"
            onChange={handleChange}
          >
            <option>Select Blood Group</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
          </select>

          <input
            name="city"
            className="form-control mb-3"
            placeholder="Enter City"
            onChange={handleChange}
          />

          <button className="btn btn-danger w-100">
            Register
          </button>

        </form>

      </div>
    </div>
  );
}

export default RegisterDonor;