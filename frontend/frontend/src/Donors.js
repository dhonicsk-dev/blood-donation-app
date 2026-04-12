import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Donors() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);

  const navigate = useNavigate();

  const API = "https://blood-backend-6.onrender.com";

  // ✅ Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // 🔍 Search donors
  const searchDonors = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!bloodGroup || !city) {
        alert("Enter blood group & city ❌");
        return;
      }

      const res = await axios.post(
        `${API}/api/donors`,
        { bloodGroup, city },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDonors(res.data.data || []);

    } catch (err) {
      console.log(err); // 🔥 debug
      alert("Error fetching donors ❌");
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Donors</h2>

      <button onClick={handleLogout}>Logout</button>
      <br /><br />

      <input
        placeholder="Blood Group (e.g O+)"
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br /><br />

      <button onClick={searchDonors}>Search</button>

      <br /><br />

      {/* ✅ Better UI */}
      {donors.length === 0 ? (
        <p>No donors found</p>
      ) : (
        <ul>
          {donors.map((d, i) => (
            <li key={i}>
              <strong>{d.email}</strong> - {d.bloodGroup} - {d.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Donors;