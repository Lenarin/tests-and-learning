require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: process.env.dbpass,
  port: 5432,
});

require(`./app`)(app, pool);

app.listen(port, () => {
    console.log(`Start listener on port ${port}`);
});




