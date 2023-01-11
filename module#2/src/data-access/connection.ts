import { Sequelize } from "sequelize";

const uri: string =
  "postgres://cbdopphr:E0ihexCtkTCvgHt9yKzbDNYS1KF60eOJ@tiny.db.elephantsql.com/cbdopphr";

export const sequelize = new Sequelize(uri, { dialect: "postgres" });
