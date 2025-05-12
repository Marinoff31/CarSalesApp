import { Database } from "../Database";
import { IUser } from "../common/interfaces";

const db = new Database();

export class UserModel {
  static async create(user: IUser) {
    const [result] = await db.conn.execute(
      "INSERT INTO users (name, address, phone) VALUES (?, ?, ?)",
      [user.name, user.address, user.phone]
    );
    return result;
  }
  
static async getAll() {
  const [rows] = await db.conn.execute("SELECT * FROM users");
  return rows;
}
  static async getById(id: number) {
  const [rows] = await db.conn.execute("SELECT * FROM users WHERE id = ?", [id]);
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

  static async update(id: number, user: IUser) {
    const [result] = await db.conn.execute(
      "UPDATE users SET name = ?, address = ?, phone = ? WHERE id = ?",
      [user.name, user.address, user.phone, id]
    );
    return result;
  }

  static async delete(id: number) {
    const [result] = await db.conn.execute("DELETE FROM users WHERE id = ?", [id]);
    return result;
  }
}
