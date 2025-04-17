import database, { type Connection, type ConnectionOptions, type QueryResult as Result} from 'mysql2/promise';

export class Database{

  static async connect(): Promise<Connection> {
    const access: ConnectionOptions = {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      rowsAsArray: process.env.DB_ROWS_AS_ARRAY === 'true' ? true : false,
      namedPlaceholders: process.env.DB_NAMED_PLACEHOLDERS === 'true' ? true : false
    };
    return await database.createConnection(access);
  }

  static async close(connection: Connection): Promise<void> {
    await connection.end();
  };

  static async query(connection: Connection, sql: string, values?: any[]): Promise<Result> {
    const [rows,_] = await connection.query<Result>(sql, values);
    return rows;
  };

  static async start(connection: Connection): Promise<void> {
    return await connection.beginTransaction();
  };

  static async commit(connection: Connection): Promise<void> {
    await connection.commit();
  };

  static async rollback(connection: Connection): Promise<void> {
    await connection.rollback();
  };
};

//Export Types and Interfaces Section

export type {Result};
export type {Connection};
