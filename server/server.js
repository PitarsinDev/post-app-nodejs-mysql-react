const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// MySQL Configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'post_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API to save posts
app.post('/api/posts', (req, res) => {
  const { name, image, text } = req.body;

  const query = `INSERT INTO posts (name, image, text) VALUES (?, ?, ?)`;
  db.query(query, [name, image, text], (err, results) => {
    if (err) throw err;
    res.send('Post created successfully');
  });
});

app.get('/api/posts', (req, res) => {
    const query = `SELECT * FROM posts`;
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

app.delete('/api/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    const query = `DELETE FROM posts WHERE id = ?`;
    db.query(query, [postId], (err, results) => {
      if (err) throw err;
      res.send('Post deleted successfully');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});