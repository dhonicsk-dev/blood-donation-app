import React, { useState, useEffect } from "react";
import axios from "axios";

function Donors() {
  const [donors, setDonors] = useState([]);

  const API = "http://localhost:5000";

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const res = await axios.get(`${API}/api/donors`);
    setDonors(res.data);
  };

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