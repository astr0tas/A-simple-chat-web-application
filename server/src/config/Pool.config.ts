import mysql from 'mysql2';

const Pool: mysql.PoolOptions = {
      host: "localhost",
      user: "web_chat",
      password: "webchat123",
      database: "web_chat",
      multipleStatements: true
};

export default Pool;