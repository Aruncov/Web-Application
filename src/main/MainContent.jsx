import React from "react";
import ItemMaster from "../Side Bar/Master/ItemMaster/ItemMaster";
import UserManagement from "../pages/UserManagement/UserManagement";
import Subcontracting from "../Side Bar/Transaction/Subcon/Subcontracting";


import "./Main.css";

function MainContent({ selectedPage, userRole }) {
  return (
    <div className="main-area">
      {/* ===== HOME PAGE ===== */}
      {selectedPage === "Home" && (
        <div className="home-container">
          <h1>🏭 Welcome to Manufacturing Industry</h1>
          <p>
            Centralized system for Masters, Transactions, and Accounts within your
            WEB-ERP Application.
          </p>
        </div>
      )}

      {/* ===== ITEM MASTER ===== */}
      {selectedPage === "ItemMaster" && <ItemMaster />}

      {/* ===== USER MANAGEMENT (Restricted to SuperAdmin) ===== */}
      {selectedPage === "UserManagement" && (
        userRole === "SuperAdmin" ? (
          <UserManagement />
        ) : (
          <div className="home-container">
            <h2>🚫 Access Denied</h2>
            <p>Only SuperAdmin can view this page.</p>
          </div>
        )
      )}
      {selectedPage === "SubCon" && <Subcontracting />}
    </div>
  );
}

export default MainContent;
