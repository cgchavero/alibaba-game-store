// src/utils/tidb.js
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'your-tidb-host',
  user: 'your-username',
  password: 'your-database-password',
  database: 'game_store',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool.promise();
