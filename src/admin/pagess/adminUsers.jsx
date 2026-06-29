import {
  useEffect,
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
  const dispatch =
    useDispatch();

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

  return (
    <AdminLayout>
      <h1>
        👤 User Management
      </h1>

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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
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