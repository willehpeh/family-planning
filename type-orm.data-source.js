const { DataSource } = require('typeorm');

module.exports = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: +process.env.POSTGRES_PORT,
  username: "postgres",
  password: "pass1234",
  database: "postgres",
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./migrations/*.js'],
});
