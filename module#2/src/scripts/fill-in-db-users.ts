import { sequelize } from "../data-access";
import { mockUsers } from "../mock";
import { authenticateMessage } from "../constants";
import { User } from "../models";

const fillInDbUsers = async () => {
  try {
    await sequelize.authenticate();
    console.info(authenticateMessage);

    await User.sync({ force: true });

    User.bulkCreate(mockUsers);
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
};

fillInDbUsers();
