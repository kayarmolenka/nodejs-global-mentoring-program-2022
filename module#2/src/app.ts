import express from "express";

import { routerUsers, routerCommon } from "./api/routes";
import { authenticateMessage, PORT, PORT_FOR_DB } from "./constants";
import { sequelize } from "./data-access";
import { User } from "./models";

const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`Server has been started on ${PORT}`));

app.use("/", routerCommon);
app.use("/users", routerUsers);

const startServer = async () => {
  await sequelize.authenticate();
  await User.sync();
};

startServer()
  .then(() => {
    app.listen(PORT_FOR_DB, () => console.info(authenticateMessage));
  })
  .catch((err) => console.info(err));
