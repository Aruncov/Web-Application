import React, { useState } from "react";
import Sidebar from "./Side Bar/Sidebar";
import MainContent from "./main/MainContent";
import Login from "./Side Bar/Login/Login";
import { getCurrentUser, logout } from "./utils/auth";
import "./App.css";

function App() {
  const [selectedPage, setSelectedPage] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(getCurrentUser());

  // ✅ Handle login success
  const handleLogin = (userObj) => {
    setUser(userObj);
  };

  // ✅ Handle logout
  const handleLogout = () => {
    logout();
    setUser(null);
    setSelectedPage("Home");
  };

  // ✅ Show login screen if user not logged in
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      {/* ===== HEADER ===== */}
      <header className="top-header">
        <div className="logo">🏭 Manufacturing ERP</div>
        <div className="header-buttons">
          <button onClick={() => setSelectedPage("Home")}>🏠 Home</button>
          <button onClick={handleLogout}>🚪 Logout</button>
          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "⬅ Hide Menu" : "➡ Show Menu"}
          </button>
        </div>
      </header>

      {/* ===== SIDEBAR + MAIN AREA ===== */}
      <div className="content-wrapper">
        <Sidebar
          onMenuClick={setSelectedPage}
          isOpen={sidebarOpen}
          userRole={user.role} // pass user role for restricted access
        />
        <MainContent selectedPage={selectedPage} userRole={user.role} />
      </div>
    </div>
  );
}

export default App;
