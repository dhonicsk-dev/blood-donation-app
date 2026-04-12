import React, { useEffect } from "react";
import Donors from "./Donors";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">
        <h2>Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      <div className="card p-3 shadow-sm">
        <Donors />
      </div>

    </div>
  );
}

export default Dashboard;