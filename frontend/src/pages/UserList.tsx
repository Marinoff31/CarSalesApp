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
      setUsers(users.filter((user) => user.id !== id)); // Обновяваме списъка след изтриването
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "white" }}>Списък на потребители</h2>
      <Link to="/create-user">
        <button>Създай потребител</button>
      </Link>
      {users.length === 0 ? (
        <p>Няма потребители.</p>
      ) : (
        <div>
          {users.map((user) => (
            <div  key={user.id} style={{ color: "white", border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
              <h3 style={{ color: "white" }}>{user.name}</h3>
              <p style={{ color: "white" }}>{user.address}</p>
              <p style={{ color: "white" }}>{user.phone}</p>
              <Link to={`/edit-user/${user.id}`}>
                <button style={{ marginRight: "0.5rem" }}>Редактирай</button>
              </Link>
              <button onClick={() => handleDelete(user.id!)}>Изтрий</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
