import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // ✅ Correct API usage
  const API = process.env.REACT_APP_API_URL; // define API first
const res = await axios.post(`${API}/api/login`, form);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/api/login`, form);

      // ✅ Save login data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", form.email);

      alert("Login success ✅");

      navigate("/donors");

    } catch (err) {
      console.log(err.response?.data || err);
      alert("Login failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>

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

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;