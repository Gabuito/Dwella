import { Database, type Connection, type Result } from "./database.utils.ts";

interface IDBHealthCheck {
  online: boolean;
  message: string;
}

export type DatabaseCheck = IDBHealthCheck;

export async function isDatabaseOnline(): Promise<IDBHealthCheck> {
  let connection: Connection | null = null;
  try {
    connection = await Database.connect();
    const result: Result = await Database.query(connection, 'SELECT 1');
    if (Array.isArray(result) && result.length > 0) {
      return { online: true, message: 'Database is online' };
    } else {
      return { online: false, message: 'Database is offline' };
    }
  } catch (error) {
    return { online: false, message: 'Database is offline' };
  } finally {
    if (connection) {
      await Database.close(connection);
    }
  }
}