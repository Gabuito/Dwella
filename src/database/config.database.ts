import mysql, { type Connection, type ConnectionOptions, type FieldPacket, type QueryResult, type ResultSetHeader, type RowDataPacket }  from "mysql2/promise";

export interface DatabaseAPI {
  init: () => Promise<Connection>;
  connect: (connection: Connection) => Promise<void>;
  disconnect: (connection: Connection) => Promise<void>;
  query: (connection: Connection, query: string, values: any) => Promise<RowDataPacket[]>;
  execute: (connection: Connection, query: string, values: any) => Promise<ResultSetHeader>;
  transaction: (connection: Connection) => Promise<void>;
  commit: (connection: Connection) => Promise<void>;
  rollback: (connection: Connection) => Promise<void>;
}

export const Database : DatabaseAPI= {
  init : async () : Promise<Connection> => {
    const config : ConnectionOptions = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      rowsAsArray: process.env.DB_ROWS_AS_ARRAY === "true",
      namedPlaceholders: process.env.DB_NAMED_PLACEHOLDERS === "true",
    };
    return await mysql.createConnection(config);
  },
  connect : async (connection: Connection) : Promise<void> => {
    await connection.connect();
  },
  disconnect : async (connection: Connection) : Promise<void> => {
    await connection.end();
  },
  query : async (connection: Connection, query: string, values: any) : Promise<RowDataPacket[]> => {
    const [rows,_] : [QueryResult,FieldPacket[]] = await connection.query(query, values);
    return rows as RowDataPacket[];
  },
  execute : async (connection: Connection, query: string, values: any) : Promise<ResultSetHeader> => {
    const [result,_] : [QueryResult ,FieldPacket[]] = await connection.execute(query, values);
    return result as ResultSetHeader;
  },
  transaction : async (connection: Connection) : Promise<void> => {
    await connection.beginTransaction();    
  },
  commit : async (connection: Connection) : Promise<void> => {
    await connection.commit();    
  },
  rollback : async (connection: Connection) : Promise<void> => {
    await connection.rollback();    
  }
};

export type { Connection, FieldPacket as Info, QueryResult as Result, ResultSetHeader as InsertInfo };