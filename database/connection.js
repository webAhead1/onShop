const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.DATABASE_URL;

const database = new pg.Pool({connectionString});

module.exports = database;