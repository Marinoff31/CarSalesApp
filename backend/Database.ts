import { createPool, Pool } from "mysql2/promise";

export class Database {
    conn: Pool;

    constructor() {
        this.conn = createPool({
            host: "localhost",
            database: "carsales",
            user: "root",
            password: "",
        });
    }
}
