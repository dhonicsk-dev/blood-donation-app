import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/donors")
      .then(res => setDonors(res.data));
  }, []);

  const deleteDonor = async (id) => {
    await axios.delete(`http://localhost:5000/api/donor/${id}`);
    alert("Deleted ✅");
    window.location.reload();
  };

  return (
    <div>
      <h2>🧑‍💼 Admin Panel</h2>

      {donors.map(d => (
        <div key={d._id} style={{ marginBottom: "10px" }}>
          {d.name} - {d.bloodGroup} ({d.city})
          <button
            onClick={() => deleteDonor(d._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;