import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // ✅ Define API correctly
  const API = "https://blood-backend-6.onrender.com";

  const handleRegister = async () => {
    try {
      // ✅ Single correct API call
      await axios.post(`${API}/api/register`, form);

      alert("Registered successfully ✅");
      navigate("/login");

    } catch (err) {
      console.log(err.response?.data || err);
      alert("Registration failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Register</h2>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
      <br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;