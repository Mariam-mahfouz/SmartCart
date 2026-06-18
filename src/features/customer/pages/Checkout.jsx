import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // البيانات اللي جاية من cart / payment
  const order = location.state;

  // لو الصفحة اتفتحت مباشرة بدون بيانات
  if (!order) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No order found ❌</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const total = order.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <div style={styles.container}>
      <div style={styles.receipt}>
        <h2 style={styles.title}>🧾 Payment Receipt</h2>

        <div style={styles.header}>
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Customer:</strong> {order.customerName}</p>
        </div>

        <hr />

        <h3>Items</h3>

        {order.items.map((item, index) => (
          <div key={index} style={styles.item}>
            <span>{item.name}</span>
            <span>
              {item.qty} × {item.price} EGP
            </span>
          </div>
        ))}

        <hr />

        <h2>Total: {total} EGP</h2>

        <button style={styles.button} onClick={() => window.print()}>
          Print Receipt 🖨️
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  receipt: {
    width: "400px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  header: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    margin: "8px 0",
  },
  button: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Checkout;