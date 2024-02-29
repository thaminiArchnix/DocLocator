const mysql = require('mysql2')


//Connect to Server
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

//Create a database if it does not exist
connect.query('CREATE DATABASE IF NOT EXISTS dlocator', (err, results) => {
  if (err) {
    console.error('Error creating database:', err);
    return;
  }
  console.log('Database created successfully');
  connect.end(); // Close the connection
});

//Connect to created database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dlocator'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  //Doctor Table -- By Thamini
  connection.query(`CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    date_of_birth DATE,
    password VARCHAR(255),
    gender ENUM('female', 'male', 'other'),
    phone_number VARCHAR(20),
    specialization TEXT,
    longitude DECIMAL(10, 8),
    latitude DECIMAL(11, 8)
    )`, (err, results) => {
    if (err) {
      console.error('Error creating doctors table:', err);
      return;
    }
    console.log('doctors table created or already exists');
  });





});

module.exports = connection;
