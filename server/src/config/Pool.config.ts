import mysql from 'mysql2';

const Pool: mysql.PoolOptions = {
      host: "localhost",
      user: "uwc",
      password: "uwc123",
      database: "UWC_ENHANCED_EDITION",
      multipleStatements: true
};

export default Pool;