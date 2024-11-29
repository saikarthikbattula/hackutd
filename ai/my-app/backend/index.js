const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();  // Import SQLite

const app = express();

// Enable CORS for frontend
app.use(cors());

// URL of the GitHub page
const githubURL = 'https://github.com/SimplifyJobs/Summer2025-Internships#the-list-';

// Set up SQLite database
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

// Function to scrape the data
const scrapeData = async () => {
  try {
    const { data } = await axios.get(githubURL);
    const $ = cheerio.load(data);
    const rows = [];

    // Scrape rows within the table's tbody
    $('table tbody tr').each((_, element) => {
      const company = $(element).find('td:nth-child(1)').text().trim();
      const position = $(element).find('td:nth-child(2)').text().trim();
      const location = $(element).find('td:nth-child(3)').text().trim();
      const date = $(element).find('td:nth-child(4)').text().trim();

      if (company || position || location || date) {
        rows.push({ company, position, location, date });
      }
    });

    return rows;
  } catch (error) {
    console.error('Error scraping data:', error);
    throw new Error('Failed to scrape data');
  }
};

// Root route to display commands
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Web Scraper API!</h1>
    <p>Use the following routes:</p>
    <ul>
      <li><strong>/scrape</strong> - Fetch raw scraped job data as JSON.</li>
      <li><strong>/categorized</strong> - Get the scraped data categorized by location.</li>
      <li><strong>/save</strong> - Save the scraped data to the SQLite database.</li>
      <li><strong>/jobs</strong> - Fetch all jobs from the SQLite database.</li>
    </ul>
  `);
});

// Route to fetch raw scraped data
app.get('/scrape', async (req, res) => {
  try {
    const data = await scrapeData(); // Fetch scraped data
    res.json(data); // Return raw data as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch categorized data
app.get('/categorized', async (req, res) => {
  try {
    const data = await scrapeData(); // Fetch scraped data

    // Categorize jobs by location
    const categorizedData = data.reduce((acc, job) => {
      const location = job.location || 'Unknown'; // Default to 'Unknown' for missing locations
      if (!acc[location]) acc[location] = []; // Initialize category if not exists
      acc[location].push(job);
      return acc;
    }, {});

    // Transform categorized data into an array for better readability
    const formattedData = Object.entries(categorizedData).map(([location, jobs]) => ({
      category: location,
      jobs,
    }));

    res.json(formattedData); // Return categorized data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to save the scraped data to SQLite
app.get('/save', async (req, res) => {
  try {
    const data = await scrapeData(); // Use the scraping logic

    // Insert each job into the SQLite database
    const stmt = db.prepare('INSERT INTO jobs (company, position, location, date) VALUES (?, ?, ?, ?)');

    data.forEach((job) => {
      stmt.run(job.company, job.position, job.location, job.date);
    });

    stmt.finalize(); // Finalize the statement
    res.json({ message: 'Data saved to SQLite database' });
  } catch (error) {
    console.error('Error saving data to SQLite:', error);
    res.status(500).json({ error: 'Failed to save data to SQLite' });
  }
});

// Route to fetch all jobs from the SQLite database
app.get('/jobs', (req, res) => {
  db.all('SELECT * FROM jobs', (err, rows) => {
    if (err) {
      console.error('Error fetching jobs from SQLite:', err);
      return res.status(500).json({ error: 'Failed to fetch jobs from SQLite' });
    }
    res.json(rows);  // Send the rows as JSON response
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});