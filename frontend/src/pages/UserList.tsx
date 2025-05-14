import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IUser } from "../../common/interfaces";

const UsersList = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get<IUser[]>("http://localhost:3000/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Сигурни ли сте, че искате да изтриете този потребител?")) {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "white" }}>Списък на потребители</h2>
      {users.length === 0 ? (
        <p>Няма потребители.</p>
      ) : (
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                color: "white",
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                position: "relative", 
                background: "#3D3D3D"
              }}
            >
              <h3 style={{ color: "white" }}>{user.name}</h3>
              <p style={{ color: "white" }}>{user.address}</p>
              <p style={{ color: "white" }}>{user.phone}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end", 
                  justifyContent: "center",
                  position: "absolute",
                  right: "1rem", 
                  bottom: "1rem", 
                }}
              >
                <Link to={`/edit-user/${user.id}`}>
                  <button style={{ marginBottom: "0.2rem" }}>Редактирай</button>
                </Link>
                <button>Изтрий</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
