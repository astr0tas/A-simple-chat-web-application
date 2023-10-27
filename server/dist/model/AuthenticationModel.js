import mysql from 'mysql2';
export class AuthenticationModel {
    conn;
    constructor() {
        this.conn = mysql.createPool({
            host: "localhost",
            user: "uwc",
            password: "uwc123",
            database: "UWC_ENHANCED_EDITION",
            multipleStatements: true
        });
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
