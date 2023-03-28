const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// CREATE
app.post('/users', (req, res) => {
  const user = req.body;
  const sql = 'INSERT INTO users (fname, lname, username, avatar) VALUES (?, ?, ?, ?)';
  const values = [user.fname, user.lname, user.username, user.avatar];
  pool.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('User added successfully');
  });
});

// READ (ALL)
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  pool.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

// READ (ONE)
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM users WHERE id = ?';
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// UPDATE
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const sql = 'UPDATE users SET fname = ?, lname = ?, username = ?, avatar = ? WHERE id = ?';
  const values = [user.fname, user.lname, user.username, user.avatar, id];
  pool.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('User updated successfully');
  });
});

// DELETE
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM users WHERE id = ?';
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('User deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
