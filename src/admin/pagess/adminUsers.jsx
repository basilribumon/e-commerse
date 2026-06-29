import {
  useEffect,useState
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import AdminLayout from "../../layouts/AdminLayout";

import {
  fetchUsers,
  updateUserStatus,
} from "../redux/adminUserSlice";

function AdminUsers() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState({});

  const {
    users,
    loading,
  } = useSelector(
    (state) =>
      state.adminUsers
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
  user.name
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  user.email
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <AdminLayout>
      <h1>
        👤 User Management
      </h1>
      <div
  style={{
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search by name or email..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    style={{
      width: "320px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
    }}
  />
</div>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
              >
                <td>
                  {user.id}
                </td>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>
                <td>
  {showPassword[user.id]
    ? user.password
    : "••••••••"}

  <button
    onClick={() =>
      setShowPassword((prev) => ({
        ...prev,
        [user.id]: !prev[user.id],
      }))
    }
    style={{
      marginLeft: "10px",
      padding: "4px 8px",
      border: "none",
      background: "#0d6efd",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    {showPassword[user.id] ? "🙈 Hide" : "👁 View"}
  </button>
</td>

                <td>
                  {user.blocked
                    ? "Blocked"
                    : "Active"}
                </td>

                <td>
                  <button
                    onClick={() => {
                      dispatch(
                        updateUserStatus(
                          {
                            ...user,
                            blocked:
                              !user.blocked,
                          }
                        )
                      );
                    }}
                    style={{
                      background:
                        user.blocked
                          ? "green"
                          : "red",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "8px 15px",
                      borderRadius:
                        "8px",
                      cursor:
                        "pointer",
                    }}
                  >
                    {user.blocked
                      ? "Unblock"
                      : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}

export default AdminUsers;