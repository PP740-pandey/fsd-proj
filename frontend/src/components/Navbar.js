import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>🛒 EShop</span>
      <div style={styles.links}>
        {user ? (
          <>
            <Link to="/products" style={styles.link}>Products</Link>
            <Link to="/orders" style={styles.link}>Orders</Link>
            <span style={styles.userText}>Hi, {user.name}</span>
            <button onClick={logout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 24px", backgroundColor: "#1a1a2e", color: "#fff"
  },
  brand: { fontSize: "20px", fontWeight: "bold" },
  links: { display: "flex", gap: "16px", alignItems: "center" },
  link: { color: "#e0e0e0", textDecoration: "none", fontSize: "15px" },
  userText: { color: "#a0cfff", fontSize: "14px" },
  btn: {
    padding: "6px 14px", backgroundColor: "#e74c3c", color: "#fff",
    border: "none", borderRadius: "4px", cursor: "pointer"
  }
};

export default Navbar;
