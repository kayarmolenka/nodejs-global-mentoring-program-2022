import { sequelize } from "../data-access";
import { mockUsers } from "../mock";
import { authenticateMessage } from "../constants";
import { User } from "../models";

const fillInDbUsers = async () => {
  await sequelize.authenticate();
  await User.sync({ force: true });
  await User.bulkCreate(mockUsers);
};

fillInDbUsers()
  .then(() => console.info(authenticateMessage))
  .catch((error) => console.log("Unable to connect to the database:", error));
