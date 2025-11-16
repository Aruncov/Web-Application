import React, { useState } from "react";

function ItemMaster() {
  const [formData, setFormData] = useState({
    ItemCode: "",
    ItemName: "",
    ItemGroup: "",
    ItemType: "",
    UOM: "",
    InventoryItem: "",
  });

  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      // Update existing item
      const updated = [...items];
      updated[editIndex] = formData;
      setItems(updated);
      setEditIndex(null);
    } else {
      // Add new item
      setItems([...items, formData]);
    }
    setFormData({
      ItemCode: "",
      ItemName: "",
      ItemGroup: "",
      ItemType: "",
      UOM: "",
      InventoryItem: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(items[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  return (
    <div className="itemmaster-container">
      <h2>🧾 Item Master</h2>
      <div className="form-section">
        <input name="ItemCode" placeholder="Item Code" value={formData.ItemCode} onChange={handleChange} />
        <input name="ItemName" placeholder="Item Name" value={formData.ItemName} onChange={handleChange} />
        <input name="ItemGroup" placeholder="Item Group" value={formData.ItemGroup} onChange={handleChange} />
        <input name="ItemType" placeholder="Item Type" value={formData.ItemType} onChange={handleChange} />
        <input name="UOM" placeholder="UOM" value={formData.UOM} onChange={handleChange} />
        <input name="InventoryItem" placeholder="Inventory Item (Yes/No)" value={formData.InventoryItem} onChange={handleChange} />
        <button onClick={handleAddOrUpdate}>{editIndex !== null ? "Update" : "Add"}</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Group</th>
            <th>Item Type</th>
            <th>UOM</th>
            <th>Inventory Item</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr><td colSpan="7">No records found</td></tr>
          ) : (
            items.map((item, index) => (
              <tr key={index}>
                <td>{item.ItemCode}</td>
                <td>{item.ItemName}</td>
                <td>{item.ItemGroup}</td>
                <td>{item.ItemType}</td>
                <td>{item.UOM}</td>
                <td>{item.InventoryItem}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ItemMaster;
