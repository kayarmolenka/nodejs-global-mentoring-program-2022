import { Sequelize } from "sequelize";

const uri: string =
  "postgres://cbdopphr:Tpe1sXRFtkaDFQXPSRReAl1Jwye7uW7j@tiny.db.elephantsql.com/cbdopphr";

export const sequelize = new Sequelize(uri, { dialect: "postgres" });
