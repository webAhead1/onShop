const pg = require("pg");

const connectionString = "postgres://username:password@localhost:5432/database_name";

const database = pg.Pool({connectionString});

module.exports = database;