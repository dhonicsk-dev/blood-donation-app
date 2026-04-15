import React, { useState, useEffect } from "react";
import axios from "axios";

function Donors() {
  const [donors, setDonors] = useState([]);

  const API = "https://blood-backend-6.onrender.com";

  const token = localStorage.getItem("token"); // ✅ define token

  // ✅ Protect route
  if (!token) {
    return <h3 className="text-center mt-5">Please login first 🔐</h3>;
  }

  // ✅ Fetch donors
  const fetchDonors = async () => {
    try {
      const res = await axios.get(`${API}/api/donors`);
      setDonors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-danger mb-4 text-center">
        🩸 Available Donors
      </h3>

      <div className="row">
        {donors.map((d, i) => (
          <div key={i} className="col-md-4 mb-4">
            <div className="card p-4 shadow border-0 text-center">

              <h2 className="text-danger">{d.bloodGroup}</h2>
              <p className="text-muted">📍 {d.city}</p>

              <button className="btn btn-success w-100">
                📞 Contact
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Donors;