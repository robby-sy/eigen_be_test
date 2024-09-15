import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  username: "postgres",
  database: "eigen_trial",
  password: "postgres",
  storage: "./database.sqlite",
  logging: false,
});

export default sequelize;
