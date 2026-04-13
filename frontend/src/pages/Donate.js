import React, { useState } from "react";
import axios from "axios";

function Donate() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    city: ""
  });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/donor", form);
      alert("Donor added ✅");
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Become a Donor 🩸</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      /><br /><br />

      <input
        placeholder="Blood Group"
        onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
      /><br /><br />

      <input
        placeholder="City"
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      /><br /><br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Donate;