// src/utils/createDoc.js
const mysql = require('mysql2');

export const createWishlistItem = async (userId, game) => {
  const connection = await mysql.createConnection({
    host: 'your-tidb-host',
    user: 'user',
    password: 'password',
    database: 'game_store',
  });
  await connection.execute(
    "INSERT INTO wishlist (user_id, game_id, details) VALUES (?, ?, ?)",
    [userId, game.id, game.name]
  );
  connection.end();
};
