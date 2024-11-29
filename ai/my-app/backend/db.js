const sqlite3 = require('sqlite3').verbose();

// Create and connect to the SQLite database (it will create a file if it doesn't exist)
const db = new sqlite3.Database('./scrapedJobs.db', (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('SQLite connected');
  }
});

// Create a table for job data if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT,
      position TEXT,
      location TEXT,
      date TEXT
    );
  `);
});

module.exports = db;  // Export the database connection for use in other files
