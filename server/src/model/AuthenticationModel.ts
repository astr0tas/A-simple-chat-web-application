import mysql from 'mysql2';

export class AuthenticationModel
{
      conn: mysql.Pool;

      constructor()
      {
            this.conn = mysql.createPool({
                  host: "localhost",
                  user: "",
                  password: "",
                  database: "",
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

      // login(username, password, type, callback)
      // {
      //       if (type === 1)
      //             this.conn.query(`select employee.ID from employee join admin on admin.id=employee.id where username=? and password=?`, [username, password], (err, res) =>
      //             {
      //                   if (err)
      //                         callback(null, err);
      //                   else
      //                         callback(res, null);
      //             });
      //       else if (type === 2)
      //             this.conn.query(`select employee.ID from employee join teacher on teacher.id=employee.id where username=? and password=?`, [username, password], (err, res) =>
      //             {
      //                   if (err)
      //                         callback(null, err);
      //                   else
      //                         callback(res, null);
      //             });
      //       else if (type === 3)
      //             this.conn.query(`select employee.ID from employee join supervisor on supervisor.id=employee.id where username=? and password=?`, [username, password], (err, res) =>
      //             {
      //                   if (err)
      //                         callback(null, err);
      //                   else
      //                         callback(res, null);
      //             });
      // }

      // recovery(username, password, email, phone, callback)
      // {
      //       this.conn.query(`update employee set password=? where username=? and email=? and phone=?`, [password, username, email, phone], (err, res) =>
      //       {
      //             if (err)
      //                   callback(null, err);
      //             else
      //                   callback(res, null);
      //       });
      // }

      // validateUser(username, email, phone, callback)
      // {
      //       this.conn.query(`select * from employee where username=? and email=? and phone=?`, [username, email, phone], (err, res) =>
      //       {
      //             if (err)
      //                   callback(null, err);
      //             else
      //                   callback(res, null);
      //       })
      // }

      validateID(id: string | undefined, callback: (result: mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.ProcedureCallPacket | mysql.OkPacket[] | null, err: mysql.QueryError | null) => void)
      {
            this.conn.query(`select id from account where id=?`, [id], (err, res) =>
            {
                  if (err)
                        callback(null, err);
                  else
                        callback(res, null);
            })
      }
}