const { Pool } = require('pg');

const pool = new Pool({
  user: 'nico',           
  host: 'localhost',
  database: 'nico',      
  password: '',          
  port: 5432
});

module.exports = pool;
