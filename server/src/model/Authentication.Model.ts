import mysql from 'mysql2';

export class AuthenticationModel
{
      conn: mysql.Pool;

      constructor()
      {
            this.conn = mysql.createPool({
                  host: "localhost",
                  user: "uwc",
                  password: "uwc123",
                  database: "UWC_ENHANCED_EDITION",
                  multipleStatements: true
            });
      }

      destroy()
      {
            if (this.conn)
            {
                  this.conn.end((err) =>
                  {
                        if (err)
                        {
                              console.error('Error closing MySQL connection:', err);
                        } else
                        {
                              console.log('MySQL connection closed');
                        }
                  });
            }
      }

      login(username: string, password: string, callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void)
      {
            this.conn.query(`select * from account where username=? and password=?`, [username, password], (err, res) =>
            {
                  if (err)
                        callback(null, err);
                  else
                        callback(res as mysql.RowDataPacket[], null);
            });
      }

      recovery(username: string, password: string, callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void)
      {
            this.conn.query(`update account set password=? where username=?`, [password, username], (err, res) =>
            {
                  if (err)
                        callback(null, err);
                  else
                        callback(res as mysql.ResultSetHeader[], null);
            });
      }
      
      validateUser(username: string | undefined, callback: (result:mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void)
      {
            this.conn.query(`select username from account where username=?`, [username], (err, res) =>
            {
                  if (err)
                        callback(null, err);
                  else
                        callback(res as mysql.RowDataPacket[], null);
            })
      }
}