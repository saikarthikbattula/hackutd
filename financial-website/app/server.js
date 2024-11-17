const express = require('express');
const bodyParser = require('body-parser');
const { PinataClient } = require('pinata-sdk');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(bodyParser.json());

const pinata = new PinataClient({
  apiKey: process.env.PINATA_API_KEY,
  apiSecret: process.env.PINATA_API_SECRET
});

// A simple mock database
let usersDatabase = []; // Replace with your database or Pinata file storage.

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and Password are required' });
  }

  // Store user credentials in Pinata
  try {
    const userObject = { username, password };
    const userMetadata = await pinata.pinJSONToIPFS(userObject);

    // Store metadata (you can store IPFS hash or actual data)
    usersDatabase.push(userMetadata);

    res.status(201).json({ message: 'User registered successfully', data: userMetadata });
  } catch (error) {
    console.error('Error registering user: ', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and Password are required' });
  }

  // Check for matching user in the database (Here, we are mocking it)
  try {
    const user = usersDatabase.find(user => user.username === username);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
