import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";
import "../styles/usersDirectory.css";

const UsersDirectory = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/auth/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/api/auth/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setUsers(users.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="users-directory">
      <h1 className="head">Users Directory</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>

              <td>{item.email}</td>

              <td>{item.role === "admin" ? "Admin" : "Customer"}</td>

              <td>
                <button
                  className="delete-user-btn"
                  onClick={() => deleteUser(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersDirectory;
