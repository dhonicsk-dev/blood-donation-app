import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = "https://blood-backend-6.onrender.com";

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/api/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch {
      alert("Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: 350 }}>
        <h3 className="text-center mb-3">Login</h3>

        <input className="form-control mb-2" placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)} />

        <input className="form-control mb-2" type="password" placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)} />

        <button className="btn btn-primary w-100 mb-2"
          onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button className="btn btn-outline-success w-100"
          onClick={()=>navigate("/register")}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;