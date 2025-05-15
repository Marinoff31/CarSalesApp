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
    <div className="users-container">
      <h2 className="users-heading">Списък на потребители</h2>
      {users.length === 0 ? (
        <p className="users-empty">Няма потребители.</p>
      ) : (
        <div>
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>Адрес: {user.address}</p>
              <p>Телефон за връзка: {user.phone}</p>
              <div className="user-actions">
                <Link to={`/edit-user/${user.id}`}>
                  <button className="user-button">Редактирай</button>
                </Link>
                <button className="user-button" onClick={() => handleDelete(user.id)}>Изтрий</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
