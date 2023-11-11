import mysql from 'mysql2';
import Pool from '../config/Pool.config.js'; // Must include `.js` extension in order to work properly!
export class AuthenticationModel {
    conn;
    constructor() {
        this.conn = mysql.createPool(Pool);
    }
    destroy() {
        if (this.conn) {
            this.conn.end((err) => {
                if (err) {
                    console.error('Error closing MySQL connection:', err);
                }
                else {
                    console.log('MySQL connection closed');
                }
            });
        }
    }
    login(username, password, callback) {
        this.conn.query(`select * from account where username=? and password=?`, [username, password], (err, res) => {
            if (err)
                callback(null, err);
            else
                callback(res, null);
        });
    }
    recovery(username, password, callback) {
        this.conn.query(`update account set password=? where username=?`, [password, username], (err, res) => {
            if (err)
                callback(null, err);
            else
                callback(res, null);
        });
    }
    validateUser(username, callback) {
        this.conn.query(`select username from account where username=?`, [username], (err, res) => {
            if (err)
                callback(null, err);
            else
                callback(res, null);
        });
    }
}
