import { Database } from "../Database";
import { ICar } from "../common/interfaces";

const db = new Database();

export class CarModel {
  static async create(car: ICar) {
    const [result] = await db.conn.execute(
      `INSERT INTO cars (brand, production_year, mileage, engine_type, horsepower, price, owner_id, image_url, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        car.brand,
        car.production_year,
        car.mileage,
        car.engine_type,
        car.horsepower,
        car.price,
        car.owner_id,
        car.image_url,
        car.description
      ]
    );
    return result;
  }

  static async getById(id: number) {
    const [rows] = await db.conn.execute("SELECT * FROM cars WHERE id = ?", [id]);
    return rows;
  }

  static async update(id: number, car: ICar) {
    const [result] = await db.conn.execute(
      `UPDATE cars SET brand = ?, production_year = ?, mileage = ?, engine_type = ?, horsepower = ?, price = ?, owner_id = ?, image_url = ?, description = ?
       WHERE id = ?`,
      [
        car.brand,
        car.production_year,
        car.mileage,
        car.engine_type,
        car.horsepower,
        car.price,
        car.owner_id,
        car.image_url,
        car.description,
        id
      ]
    );
    return result;
  }

  static async delete(id: number) {
    const [result] = await db.conn.execute("DELETE FROM cars WHERE id = ?", [id]);
    return result;
  }

  static async filter(query: any) {
    let sql = "SELECT * FROM cars WHERE 1=1";
    const params: any[] = [];

    if (query.brand) {
      sql += " AND brand = ?";
      params.push(query.brand);
    }
    if (query.engine_type) {
      sql += " AND engine_type = ?";
      params.push(query.engine_type);
    }
    if (query.min_price) {
      sql += " AND price >= ?";
      params.push(query.min_price);
    }
    if (query.max_price) {
      sql += " AND price <= ?";
      params.push(query.max_price);
    }
    if (query.year) {
      sql += " AND production_year = ?";
      params.push(query.year);
    }

    const [rows] = await db.conn.execute(sql, params);
    return rows;
  }
}