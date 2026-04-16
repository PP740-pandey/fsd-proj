import React, { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/api";

const emptyForm = { name: "", price: "", quantity: "" };

function Products() {
  const [products, setProducts]   = useState([]);
  const [form, setForm]           = useState(emptyForm);
  const [editId, setEditId]       = useState(null);
  const [msg, setMsg]             = useState("");

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name: form.name, price: parseFloat(form.price), quantity: parseInt(form.quantity) };
    try {
      if (editId) {
        await updateProduct(editId, payload);
        setMsg("Product updated!");
      } else {
        await addProduct(payload);
        setMsg("Product added!");
      }
      setForm(emptyForm);
      setEditId(null);
      fetchProducts();
    } catch {
      setMsg("Error saving product.");
    }
    setTimeout(() => setMsg(""), 2000);
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, price: p.price, quantity: p.quantity });
    setEditId(p.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div style={styles.page}>
      {/* Form */}
      <div style={styles.card}>
        <h3>{editId ? "Edit Product" : "Add Product"}</h3>
        {msg && <p style={styles.msg}>{msg}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="name" placeholder="Product Name" value={form.name}
            onChange={handleChange} style={styles.input} required />
          <input name="price" placeholder="Price" type="number" step="0.01"
            value={form.price} onChange={handleChange} style={styles.input} required />
          <input name="quantity" placeholder="Quantity" type="number"
            value={form.quantity} onChange={handleChange} style={styles.input} required />
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={styles.btn}>{editId ? "Update" : "Add"}</button>
            {editId && (
              <button type="button" style={styles.cancelBtn}
                onClick={() => { setEditId(null); setForm(emptyForm); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Product List */}
      <div style={styles.card}>
        <h3>All Products</h3>
        {products.length === 0 ? (
          <p style={{ color: "#888" }}>No products yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Price (₹)</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={styles.tr}>
                  <td style={styles.td}>{p.id}</td>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}>₹{p.price}</td>
                  <td style={styles.td}>{p.quantity}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(p)} style={styles.editBtn}>Edit</button>
                    <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: "900px", margin: "30px auto", padding: "0 16px" },
  card: {
    background: "#fff", padding: "24px", borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)", marginBottom: "24px"
  },
  form: { display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "flex-end" },
  input: {
    padding: "8px 12px", border: "1px solid #ccc",
    borderRadius: "4px", fontSize: "14px", minWidth: "160px"
  },
  btn: {
    padding: "8px 20px", backgroundColor: "#1a1a2e",
    color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer"
  },
  cancelBtn: {
    padding: "8px 20px", backgroundColor: "#aaa",
    color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer"
  },
  msg: { color: "green", marginBottom: "8px" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "10px", borderBottom: "2px solid #eee", fontSize: "13px", color: "#555" },
  td: { padding: "10px", borderBottom: "1px solid #f0f0f0", fontSize: "14px" },
  tr: { transition: "background 0.2s" },
  editBtn: {
    marginRight: "8px", padding: "4px 12px", background: "#3498db",
    color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer"
  },
  deleteBtn: {
    padding: "4px 12px", background: "#e74c3c",
    color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer"
  }
};

export default Products;
