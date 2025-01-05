require('dotenv').config();
const express = require('express');
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Database configuration
const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'demopost',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'bakery',
});

// Database connection
async function connectDB() {
  try {
    await client.connect();
    console.log("holbolt amjilttai");
  } catch (err) {
    console.error('holboltod aldaa garlaa:', err.stack);
    process.exit(1);
  }
}

connectDB();

// Input validation middleware
const validateRegistration = (req, res, next) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: "bugdiin boglono uu" });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: "6gaas deesh usegtei baih ystoi " });
  }
  
  next();
};

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'signup.html')));
app.get('/app', (req, res) => res.sendFile(path.join(__dirname, 'app.html')));
app.get('/salbar', (req, res) => res.sendFile(path.join(__dirname, 'salbar.html')));
app.get('/products.json', (req, res) => res.sendFile(path.join(__dirname, 'products.json')));

// Auth routes
app.post('/register', validateRegistration, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await client.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "burtgegdsen" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      `INSERT INTO users (username, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, username, email`,
      [username, email, hashedPassword]
    );
    
    res.status(201).json({ 
      message: "amjilttai",
      user: result.rows[0]
    });
  } catch (err) {
    console.error('aldaa garlaa:', err);
    res.status(500).json({ 
      error: "aldaa garlaa",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await client.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "buruu" });
    }

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "buruu" });
    }

    res.status(200).json({
      message: "amjilttai",
      user: {
        id: user.rows[0].id,
        username: user.rows[0].username,
        email: user.rows[0].email
      }
    });
  } catch (err) {
    console.error('nevtrehed aldaa garlaa:', err);
    res.status(500).json({ 
      error: "nevtrehed aldaa garlaa",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'aldaa' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'oldsongui' });
});

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ene deer darna uu http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  client.end();
  process.exit(0);
});