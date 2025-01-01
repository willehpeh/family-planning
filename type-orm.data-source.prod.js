const { DataSource } = require('typeorm');

module.exports = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_SUPERUSER,
  password: process.env.POSTGRES_SUPERPASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./migrations/*.js'],
});
