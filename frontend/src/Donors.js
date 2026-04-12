import React, { useState } from "react";
import axios from "axios";

function Donors() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = "https://blood-backend-6.onrender.com";

  const searchDonors = async () => {
    if (!bloodGroup || !city) {
      alert("Enter blood group & city ❌");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/api/donors`,
        { bloodGroup, city },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDonors(res.data.data || []);

    } catch {
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Find Donors</h4>

      <input className="form-control mb-2"
        placeholder="Blood Group"
        onChange={(e)=>setBloodGroup(e.target.value)} />

      <input className="form-control mb-2"
        placeholder="City"
        onChange={(e)=>setCity(e.target.value)} />

      <button className="btn btn-primary mb-3" onClick={searchDonors}>
        {loading ? "Searching..." : "Search"}
      </button>

      {donors.length === 0 && !loading && (
        <p className="text-muted">No donors found</p>
      )}

      <div className="row">
        {donors.map((d, i) => (
          <div key={i} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <h5>{d.bloodGroup}</h5>
              <p>{d.city}</p>
              <small>{d.email}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Donors;