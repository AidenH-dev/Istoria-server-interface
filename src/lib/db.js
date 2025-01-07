import sqlite3 from 'sqlite3';
import path from 'path';

const db = new sqlite3.Database(
  path.resolve('/home/castiel/IoT-Systems/database/iot_temp-humidity_data.db'),
  (err) => {
    if (err) {
      console.error('Failed to connect to the database:', err.message);
    } else {
      console.log('Connected to SQLite database');
    }
  }
);

export default db;
