import { DATABASE } from "../database/const.table.ts";
import { Database, type Connection, type DatabaseAPI, type Info, type InsertInfo, type Result } from "../database/config.database.ts";
import type { UserPlaceholders } from "../dto/user.dto.ts";
import Exception from "../services/exception.service.ts";

export default class Repository{

  private _database: DatabaseAPI;

  constructor(database?: DatabaseAPI) {
    this._database = database ? database : Database;
  }


  public async insertUser(values: UserPlaceholders): Promise<number> {
    const base : DatabaseAPI = this._database;
    try{
      const connection : Connection = await base.init();
      // Get all column names except 'ID'
      const columns = Object.values(DATABASE.TABLES.USERS.COLUMNS).filter(col => col !== DATABASE.TABLES.USERS.COLUMNS.ID);
      const columnsString = columns.join(", ");
      const placeholders = columns.map(() => '?').join(', ');
      const query: string = `INSERT INTO tb_users (${columnsString}) VALUES (${placeholders})`;
      // Execute query using the correct API method
      const result: InsertInfo = await base.execute(connection, query, values);
      return result.insertId;
    } catch (error) {
      throw new Exception(`Error inserting user: ${error}`, 500, error as Error);
    }
  }
};
