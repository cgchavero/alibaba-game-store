// src/utils/tidb.js
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
  user: 'A7C7wh5h6WmjqES.root',
  password: '0cACtylsu75mu9Kl',
  database: 'game_store',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool.promise();
