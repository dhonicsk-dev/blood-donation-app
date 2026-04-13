import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/register",
        form
      );

      alert("Registered successfully ✅");
      window.location.href = "/login";
    } catch {
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