import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await axios.post(" https://blood-backend-6.onrender.com", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);

    alert("Login success ✅");

    navigate("/dashboard"); // 🔥 redirect

  } catch (err) {
    alert("Login failed ❌");
  }
};

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
import { useNavigate } from "react-router-dom";\
<button onClick={() => navigate("/register")}>
  Go to Register
</button>