import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Welcome to the Dashboard!</h2>
      <p>This is your protected dashboard content.</p>
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
};

export default DashboardPage;
