import express from "express";

import { routerUsers, routerCommon, routerGroups } from "./api/routes";
import { authenticateMessage, PORT, PORT_FOR_DB } from "./constants";
import { sequelize } from "./data-access";
import { Group, User, UserGroup } from "./models";

const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`Server has been started on ${PORT} port`));

app.use("/", routerCommon);
app.use("/users", routerUsers);
app.use("/groups", routerGroups);

const startServer = async () => {
  await sequelize.authenticate();
  await User.sync();
  await Group.sync();
  await UserGroup.sync();
};

startServer()
  .then(() => {
    app.listen(PORT_FOR_DB, () => console.info(authenticateMessage));
  })
  .catch((err) => console.info(err));
