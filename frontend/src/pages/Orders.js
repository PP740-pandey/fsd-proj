import React, { useState, useEffect } from "react";
import { getProducts, placeOrder, getOrders } from "../services/api";

function Orders() {
  const [products, setProducts]   = useState([]);
  const [orders, setOrders]       = useState([]);
  const [form, setForm]           = useState({ productId: "", quantity: "" });
  const [msg, setMsg]             = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await getOrders();
    setOrders(res.data);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user) { setMsg("Please login first."); return; }
    try {
      await placeOrder({
        userId: user.id,
        productId: parseInt(form.productId),
        quantity: parseInt(form.quantity)
      });
      setMsg("Order placed successfully!");
      setForm({ productId: "", quantity: "" });
      fetchOrders();
      fetchProducts(); // refresh stock
    } catch (err) {
      setMsg(err.response?.data || "Failed to place order.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div style={styles.page}>
      {/* Place Order Form */}
      <div style={styles.card}>
        <h3>Place an Order</h3>
        {msg && <p style={styles.msg}>{msg}</p>}
        <form onSubmit={handleOrder} style={styles.form}>
          <select name="productId" value={form.productId} onChange={handleChange}
            style={styles.input} required>
            <option value="">-- Select Product --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — ₹{p.price} (Stock: {p.quantity})
              </option>
            ))}
          </select>
          <input
            name="quantity" type="number" placeholder="Quantity" min="1"
            value={form.quantity} onChange={handleChange}
            style={styles.input} required
          />
          <button type="submit" style={styles.btn}>Place Order</button>
        </form>
      </div>

      {/* Orders List */}
      <div style={styles.card}>
        <h3>All Orders</h3>
        {orders.length === 0 ? (
          <p style={{ color: "#888" }}>No orders yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td style={styles.td}>{o.id}</td>
                  <td style={styles.td}>{o.user.name}</td>
                  <td style={styles.td}>{o.product.name}</td>
                  <td style={styles.td}>{o.quantity}</td>
                  <td style={styles.td}>₹{(o.product.price * o.quantity).toFixed(2)}</td>
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
    borderRadius: "4px", fontSize: "14px", minWidth: "200px"
  },
  btn: {
    padding: "8px 20px", backgroundColor: "#1a1a2e",
    color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer"
  },
  msg: { color: "green", marginBottom: "8px", fontWeight: "bold" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "10px", borderBottom: "2px solid #eee", fontSize: "13px", color: "#555" },
  td: { padding: "10px", borderBottom: "1px solid #f0f0f0", fontSize: "14px" }
};

export default Orders;
