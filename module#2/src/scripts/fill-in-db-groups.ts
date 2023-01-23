import { sequelize } from "../data-access";
import { authenticateMessage } from "../constants";
import { Group } from "../models";
import { mockGroups } from "../mock";

(async () => {
  try {
    await Promise.all([sequelize.authenticate(), Group.sync({ force: true })]);
    console.info(authenticateMessage);

    return Group.bulkCreate(mockGroups);
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
})();
