import { useEffect, useState } from "react";
import { ref, onValue, update, remove, set } from "firebase/database";
import { database } from "../../../firebase";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(database, "orders");

    // 🔥 TEST ORDER (ONLY ONCE - SAFE)
    const testRef = ref(database, "orders/test_order");

    set(testRef, {
      total: 123,
      status: "pending",
      item_count: 2,
      created_at: new Date().toISOString(),
      items: {
        a1: { name: "test", price: 50, quantity: 1 }
      }
    });

    // 🔥 REALTIME LISTENER
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();

      console.log("ORDERS RAW:", data);

      if (!data) {
        setOrders([]);
        return;
      }

      const formatted = Object.entries(data).map(([id, value]) => ({
        id,

        items: value?.items || {},
        total: value?.total || 0,
        status: value?.status || "pending",
        item_count: value?.item_count || 0,
        created_at: value?.created_at || "N/A",
      }));

      // sort newest first (safe)
      formatted.sort((a, b) => {
        const t1 = new Date(b.created_at || 0).getTime();
        const t2 = new Date(a.created_at || 0).getTime();
        return t1 - t2;
      });

      setOrders(formatted);
    });

    return () => unsubscribe();
  }, []);

  // 🟡 UPDATE STATUS
  const updateStatus = (id, status) => {
    update(ref(database, `orders/${id}`), { status });
  };

  // 🗑 DELETE ORDER
  const deleteOrder = (id) => {
    remove(ref(database, `orders/${id}`));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📦 Admin Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            {/* BASIC INFO */}
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Total:</b> {order.total}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Items Count:</b> {order.item_count}</p>
            <p><b>Created:</b> {order.created_at}</p>

            {/* ITEMS */}
            <div style={{ marginTop: "10px" }}>
              <b>Items:</b>

              {Object.values(order.items || {}).length === 0 ? (
                <p style={{ marginLeft: "10px" }}>No items</p>
              ) : (
                Object.values(order.items).map((item, index) => (
                  <div key={index} style={{ marginLeft: "10px" }}>
                    • {item.name || "Unknown"} - {item.price || 0} x {item.quantity || 1}
                  </div>
                ))
              )}
            </div>

            {/* ACTIONS */}
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button onClick={() => updateStatus(order.id, "pending")}>
                Pending
              </button>

              <button onClick={() => updateStatus(order.id, "processing")}>
                Processing
              </button>

              <button onClick={() => updateStatus(order.id, "delivered")}>
                Delivered
              </button>

              <button
                onClick={() => deleteOrder(order.id)}
                style={{ background: "red", color: "white" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}