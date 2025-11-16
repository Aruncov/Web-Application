import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar({ onMenuClick, isOpen, userRole }) {
  const [openFolder, setOpenFolder] = useState("");
  const [openSubFolder, setOpenSubFolder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFolder = (folder) => {
    setOpenFolder(openFolder === folder ? "" : folder);
    setOpenSubFolder("");
  };

  const toggleSubFolder = (subFolder) => {
    setOpenSubFolder(openSubFolder === subFolder ? "" : subFolder);
  };

  // ✅ All menu items in a flat list for searching
  const allMenus = [
    { name: "Company Details", key: "CompanyDetails" },
    { name: "Chart of Account", key: "ChartOfAccount" },
    { name: "House Banks", key: "HouseBanks" },
    { name: "Item Master", key: "ItemMaster" },
    { name: "BP Master", key: "BPMaster" },
    { name: "Location Master", key: "LocationMaster" },
    { name: "Warehouse Master", key: "WarehouseMaster" },
    { name: "User Master", key: "UserMaster" },
    { name: "Employee Master", key: "EmployeeMaster" },
    { name: "User Management", key: "UserManagement", role: "SuperAdmin" },
    { name: "Purchase Request", key: "PurchaseRequest" },
    { name: "Purchase Order", key: "PurchaseOrder" },
    { name: "Goods Receipt PO", key: "GoodsReceiptPO" },
    { name: "AP Invoice", key: "APInvoice" },
    { name: "Outgoing Payment", key: "OutgoingPayment" },
    { name: "Sales Order", key: "SalesOrder" },
    { name: "Delivery", key: "Delivery" },
    { name: "AR Invoice", key: "ARInvoice" },
    { name: "Work Order", key: "WorkOrder" },
    { name: "Production Entry", key: "ProductionEntry" },
    { name: "Ledger", key: "Ledger" },
    { name: "Journal Entry", key: "JournalEntry" },
    { name: "SubCon", key: "SubCon" },
    { name: "Job Work", key: "JobWork" },
  ];

  // ✅ Filter by search text (case-insensitive)
  const filteredMenus = allMenus.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!item.role || item.role === userRole)
  );

  // ✅ Highlight matching text
  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <h2
        className="sidebar-title"
        onClick={() => onMenuClick("Home")}
        style={{ cursor: "pointer" }}
      >
        🏭 Main Menu
      </h2>

      {/* 🔍 Search bar */}
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="🔍 Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* If search term present → show filtered list */}
      {searchTerm ? (
        <ul className="sidebar-list search-results">
          {filteredMenus.length > 0 ? (
            filteredMenus.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  onMenuClick(item.key);
                  setSearchTerm(""); // clear after click
                }}
              >
                {highlightMatch(item.name)}
              </li>
            ))
          ) : (
            <li className="no-results">No results found</li>
          )}
        </ul>
      ) : (
        // 🔽 Normal folder structure when no search
        <ul className="sidebar-list">
          {/* Administrator */}
          <li onClick={() => toggleFolder("Administrator")} className="folder">
            🏦 Administrator
          </li>
          {openFolder === "Administrator" && (
            <ul className="submenu">
              <li onClick={() => onMenuClick("CompanyDetails")}>Company Details</li>
              <li onClick={() => onMenuClick("ChartOfAccount")}>Chart of Account</li>
              <li onClick={() => onMenuClick("HouseBanks")}>House Banks</li>
            </ul>
          )}

          {/* Master */}
          <li onClick={() => toggleFolder("master")} className="folder">
            📂 Master
          </li>
          {openFolder === "master" && (
            <ul className="submenu">
              <li onClick={() => onMenuClick("ItemMaster")}>Item Master</li>
              <li onClick={() => onMenuClick("BPMaster")}>BP Master</li>
              <li onClick={() => onMenuClick("LocationMaster")}>Location Master</li>
              <li onClick={() => onMenuClick("WarehouseMaster")}>Warehouse Master</li>
              <li onClick={() => onMenuClick("UserMaster")}>User Master</li>
              <li onClick={() => onMenuClick("EmployeeMaster")}>Employee Master</li>
              {userRole === "SuperAdmin" && (
                <li onClick={() => onMenuClick("UserManagement")}>👥 User Management</li>
              )}
            </ul>
          )}

          {/* Transaction */}
          <li onClick={() => toggleFolder("transaction")} className="folder">
            💼 Transaction
          </li>
          {openFolder === "transaction" && (
            <ul className="submenu">
              {/* Purchase */}
              <li onClick={() => toggleSubFolder("purchase")} className="subfolder">
                🛒 Purchase
              </li>
              {openSubFolder === "purchase" && (
                <ul className="sub-submenu">
                  <li onClick={() => onMenuClick("PurchaseRequest")}>
                    Purchase Request
                  </li>
                  <li onClick={() => onMenuClick("PurchaseOrder")}>Purchase Order</li>
                  <li onClick={() => onMenuClick("GoodsReceiptPO")}>GRN</li>
                  <li onClick={() => onMenuClick("APInvoice")}>AP Invoice</li>
                  <li onClick={() => onMenuClick("OutgoingPayment")}>
                    Outgoing Payment
                  </li>
                </ul>
              )}

              {/* Sales */}
              <li onClick={() => toggleSubFolder("sales")} className="subfolder">
                🧾 Sales
              </li>
              {openSubFolder === "sales" && (
                <ul className="sub-submenu">
                  <li onClick={() => onMenuClick("SalesOrder")}>Sales Order</li>
                  <li onClick={() => onMenuClick("Delivery")}>Delivery</li>
                  <li onClick={() => onMenuClick("ARInvoice")}>AR Invoice</li>
                </ul>
              )}

              {/* Production */}
              <li onClick={() => toggleSubFolder("production")} className="subfolder">
                ⚙️ Production
              </li>
              {openSubFolder === "production" && (
                <ul className="sub-submenu">
                  <li onClick={() => onMenuClick("WorkOrder")}>Work Order</li>
                  <li onClick={() => onMenuClick("ProductionEntry")}>Production Entry</li>
                  <li onClick={() => onMenuClick("SubCon")}>SubCon</li>
                  <li onClick={() => onMenuClick("JobWork")}>JOB Work</li>
                </ul>
              )}
            </ul>
          )}

          {/* Finance */}
          <li
            onClick={() => toggleFolder("Finance and Accounting")}
            className="folder"
          >
            💰 Finance and Accounting
          </li>
          {openFolder === "Finance and Accounting" && (
            <ul className="submenu">
              <li onClick={() => onMenuClick("Ledger")}>Ledger</li>
              <li onClick={() => onMenuClick("JournalEntry")}>Journal Entry</li>
            </ul>
          )}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
