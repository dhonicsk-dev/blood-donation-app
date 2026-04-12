import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const API = "https://blood-backend-6.onrender.com";

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Enter email & password ❌");
        return;
      }

      const res = await axios.post(`${API}/api/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login success ✅");

      navigate("/dashboard"); // ✅ STEP 4

    } catch (err) {
      console.log(err);
      alert("Login failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <br /><br />

      <button onClick={() => navigate("/register")}>
        Go to Register
      </button>
    </div>
  );
}

export default Login;