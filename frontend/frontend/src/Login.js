import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ correct place

  const API = "https://blood-backend-6.onrender.com"; // ✅ your backend

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/api/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login success ✅");

      navigate("/dashboard"); // ✅ redirect

    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <br /><br />

      {/* ✅ Register navigation */}
      <button onClick={() => navigate("/register")}>
        Go to Register
      </button>
    </div>
  );
}

export default Login;