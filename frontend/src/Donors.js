import React, { useState } from "react";
import axios from "axios";

function Donors() {
  const [search, setSearch] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = "https://blood-backend-6.onrender.com";

  const searchDonors = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const url = search.trim()
        ? `${API}/api/donors?search=${encodeURIComponent(search.trim())}`
        : `${API}/api/donors`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setDonors(res.data?.data || []);

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error fetching donors ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Find Donors</h4>

      <input
        className="form-control mb-2"
        placeholder="Search (blood, city...)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={searchDonors}>
        {loading ? "Searching..." : "Search"}
      </button>

      {!loading && donors.length > 0 && (
        <p className="text-success">{donors.length} donor(s) found</p>
      )}

      {!loading && donors.length === 0 && (
        <p className="text-muted">No donors found</p>
      )}

      <div className="row">
        {donors.map((d, i) => (
          <div key={i} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <h5>{d.bloodGroup}</h5>
              <p>{d.city}</p>
              <small>User ID: {d.userId}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Donors;