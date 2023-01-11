import { sequelize } from "../data-access";
import { mockUsers } from "../mock";
import { authenticateMessage } from "../constants";
import { User } from "../models";

(async () => {
  try {
    await Promise.all([sequelize.authenticate(), User.sync({ force: true })]);
    console.info(authenticateMessage);

    return User.bulkCreate(mockUsers);
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
})();
