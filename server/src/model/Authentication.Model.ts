import mysql from 'mysql2';
import Pool from '../config/Pool.config.js'; // Must include `.js` extension in order to work properly!

class authenticationModel
{
      conn: mysql.Pool;

      constructor()
      {
            this.conn = mysql.createPool(Pool);
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
            this.conn.query(`select * from account where username=? and passwords=?`, [username, password], (err, res) =>
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

      verifyUser(username: string, callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void)
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

export default authenticationModel;