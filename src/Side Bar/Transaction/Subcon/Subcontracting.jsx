import React, { useState } from "react";
import "./SubContracting.css";

function SubContracting() {
  // ----------- Header State -----------
  const [header, setHeader] = useState({
    CustomerCode: "",
    CustomerName: "",
    Type: "NRT",
    DocType: "Inward",
    PostingDate: "",
    DocumentDate: "",
    DeliveryDate: "",
    Remarks: "",
  });

  // ----------- Line State -----------
  const [line, setLine] = useState({
    ItemCode: "",
    Description: "",
    Quantity: "",
    UOM: "",
    Remarks: "",
  });

  const [lines, setLines] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // ----------- Change Handlers -----------
  const handleHeaderChange = (e) => {
    setHeader({ ...header, [e.target.name]: e.target.value });
  };

  const handleLineChange = (e) => {
    setLine({ ...line, [e.target.name]: e.target.value });
  };

  // ----------- Add / Update Line -----------
  const handleAddOrUpdateLine = () => {
    if (editIndex !== null) {
      const updated = [...lines];
      updated[editIndex] = line;
      setLines(updated);
      setEditIndex(null);
    } else {
      setLines([...lines, line]);
    }

    setLine({ ItemCode: "", Description: "", Quantity: "", UOM: "", Remarks: "" });
  };

  // ----------- Edit Line -----------
  const handleEditLine = (index) => {
    setLine(lines[index]);
    setEditIndex(index);
  };

  // ----------- Delete Line -----------
  const handleDeleteLine = (index) => {
    setLines(lines.filter((_, i) => i !== index));
  };

  return (
    <div className="subcontract-container">
      {/* -------- Navigation Buttons -------- */}
      <div className="nav-buttons">
        <button>⬅ Previous</button>
        <button>➡ Next</button>
        <button>⏭ Latest</button>
      </div>

      <h2>Subcontracting</h2>

      {/* -------- Header Section -------- */}
      <div className="header-grid">

        {/* Customer Code */}
        <div className="header-item">
          <label>Customer Code</label>
          <input
            name="CustomerCode"
            value={header.CustomerCode}
            onChange={handleHeaderChange}
          />
        </div>

        {/* Customer Name */}
        <div className="header-item">
          <label>Customer Name</label>
          <input
            name="CustomerName"
            value={header.CustomerName}
            onChange={handleHeaderChange}
          />
        </div>

        {/* Type */}
        <div className="header-item">
          <label>Type</label>
          <select name="Type" value={header.Type} onChange={handleHeaderChange}>
            <option value="NRT">NRT</option>
            <option value="RT">RT</option>
          </select>
        </div>

        {/* Doc Type */}
        <div className="header-item">
          <label>Document Type</label>
          <select name="DocType" value={header.DocType} onChange={handleHeaderChange}>
            <option value="Inward">Inward</option>
            <option value="Outward">Outward</option>
          </select>
        </div>

        {/* Posting Date */}
        <div className="header-item">
          <label>Posting Date</label>
          <input type="date" name="PostingDate" value={header.PostingDate} onChange={handleHeaderChange} />
        </div>

        {/* Document Date */}
        <div className="header-item">
          <label>Document Date</label>
          <input type="date" name="DocumentDate" value={header.DocumentDate} onChange={handleHeaderChange} />
        </div>

        {/* Delivery Date */}
        <div className="header-item">
          <label>Delivery Date</label>
          <input type="date" name="DeliveryDate" value={header.DeliveryDate} onChange={handleHeaderChange} />
        </div>

      </div>

      {/* -------- Remarks -------- */}
      <div className="remarks-box">
        <label>Remarks</label>
        <textarea name="Remarks" rows="3" value={header.Remarks} onChange={handleHeaderChange} />
      </div>

      {/* -------- Line Entry -------- */}
      <h3 className="section-title">Item Lines</h3>

      <div className="line-entry">
        <input name="ItemCode" placeholder="Item Code" value={line.ItemCode} onChange={handleLineChange} />
        <input name="Description" placeholder="Description" value={line.Description} onChange={handleLineChange} />
        <input name="Quantity" placeholder="Qty" value={line.Quantity} onChange={handleLineChange} />
        <input name="UOM" placeholder="UOM" value={line.UOM} onChange={handleLineChange} />
        <input name="Remarks" placeholder="Remarks" value={line.Remarks} onChange={handleLineChange} />

        <button className="addline-btn" onClick={handleAddOrUpdateLine}>
          {editIndex !== null ? "Update Line" : "Add Line"}
        </button>
      </div>

      {/* -------- Table -------- */}
      <table className="line-table">
        <thead>
          <tr>
            <th>#</th>
            <th>ItemCode</th>
            <th>Description</th>
            <th>Qty</th>
            <th>UOM</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {lines.length === 0 ? (
            <tr><td colSpan="7">No Lines Added</td></tr>
          ) : (
            lines.map((l, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{l.ItemCode}</td>
                <td>{l.Description}</td>
                <td>{l.Quantity}</td>
                <td>{l.UOM}</td>
                <td>{l.Remarks}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditLine(i)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteLine(i)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

            {/* -------- Ribbon Bar -------- */}
      <div className="ribbon-bar">
        <button className="primary-btn">Add</button>
        <button className="primary-btn">View</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>

    </div>
  );
}

export default SubContracting;
