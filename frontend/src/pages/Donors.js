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
      const API = "https://blood-backend-6.onrender.com";

const handleSubmit = async () => {
  try {
    await axios.post(
      `${API}/api/donor`,
      {
        name,
        bloodGroup,
        city
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    alert("Donor added ✅");

  } catch (err) {
    console.log(err.response?.data || err);
    alert("Error submitting donor ❌");
  }
};

      setForm({
        name: "",
        bloodGroup: "",
        city: ""
      });

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Become a Donor 🩸</h2>

      {/* Name */}
      <input
        value={form.name}
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />
      <br /><br />

      {/* Blood Group */}
      <select
        value={form.bloodGroup}
        onChange={(e) =>
          setForm({ ...form, bloodGroup: e.target.value })
        }
        style={{ padding: "8px", width: "200px" }}
      >
        <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="B+">B+</option>
        <option value="O+">O+</option>
        <option value="AB+">AB+</option>
        <option value="A-">A-</option>
        <option value="B-">B-</option>
        <option value="O-">O-</option>
        <option value="AB-">AB-</option>
      </select>
      <br /><br />

      {/* City */}
      <input
        value={form.city}
        placeholder="City"
        onChange={(e) =>
          setForm({ ...form, city: e.target.value })
        }
      />
      <br /><br />

      {/* Submit */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Donate;