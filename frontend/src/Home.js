import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-light text-center py-5">

      <h1 className="display-4 fw-bold text-danger">
        🩸 Save Lives with Blood Donation
      </h1>

      <p className="text-muted mt-3">
        Find donors quickly and help those in need ❤️
      </p>

      <div className="mt-4">
        <Link to="/donors" className="btn btn-danger btn-lg me-3">
          🔍 Find Donors
        </Link>

        <Link to="/register" className="btn btn-outline-danger btn-lg">
          ❤️ Become Donor
        </Link>
      </div>

    </div>
  );
}

export default Home;