import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../services/api";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createUser(form);
      setForm({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError("Error deleting user");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1 style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        fontSize: "1.8rem",
        whiteSpace: "nowrap",
        textAlign: "center",
        flexWrap: "nowrap",
        marginBottom: "24px",
      }}>
        <span>🚀</span>
        <span>NEXORA — User Management</span>
      </h1>

      {/* Create User Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <h3 style={{ textAlign: "center", marginBottom: "16px" }}>Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={inputStyle}
        />
        <div style={{ textAlign: "center" }}>
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Users List */}
      <h3 style={{ textAlign: "center" }}>All Users ({users.length})</h3>
      {users.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No users found. Add one above!</p>
      ) : (
        users.map((user) => (
          <div key={user._id} style={cardStyle}>
            <div>
              <strong>{user.name}</strong>
              <p style={{ margin: "4px 0", color: "#555" }}>{user.email}</p>
            </div>
            <button onClick={() => handleDelete(user._id)} style={deleteBtnStyle}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "8px 12px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  boxSizing: "border-box",
};

const btnStyle = {
  padding: "9px 20px",
  backgroundColor: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const deleteBtnStyle = {
  padding: "6px 14px",
  backgroundColor: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  marginBottom: "10px",
};
