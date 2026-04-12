import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const API = "https://blood-backend-6.onrender.com";

  // ✅ handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    try {
      if (!form.email || !form.password) {
        alert("Email & Password required ❌");
        return;
      }

      await axios.post(`${API}/api/register`, form);

      alert("Registered ✅");

      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} style={styles.input} />
      <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />
      <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} style={styles.input} />
      <input name="city" placeholder="City" onChange={handleChange} style={styles.input} />
      <input name="phone" placeholder="Phone" onChange={handleChange} style={styles.input} />

      <button onClick={handleRegister} style={styles.button}>
        Register
      </button>
    </div>
  );
}

const styles = {
  container: { padding: 20 },
  input: { display: "block", margin: "10px 0", padding: 10 },
  button: { padding: 10, background: "green", color: "#fff" }
};

export default Register;