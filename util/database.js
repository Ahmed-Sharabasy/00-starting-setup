// import mysql2 from "mysql2";
// const pool = mysql2.createPool({
//   host: "localhost",
//   user: "root",
//   database: "learnsql",
//   password: "0000",
// });
// export default pool.promise();
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("learnsql", "root", "0000", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
