const { DataSource } = require('typeorm');

module.exports = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./migrations/*.js'],
});
