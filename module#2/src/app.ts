import express from "express";
import cors from "cors";
import { routerUsers, routerCommon, routerGroups, routerAuth } from "./api/routes";
import { authenticateMessage, PORT, PORT_FOR_DB } from "./constants";
import { sequelize } from "./data-access";
import { Group, User, UserGroup } from "./models";
import { apiLogger, methodsError, morganMiddleware, routersHandleErrors } from "./middlewares";
import { logger } from "./loaders";
import { checkTokenAccess } from "./middlewares/authorization";

const app = express();

const corsOptions = {
  origin: "http://localhost:9100",
  optionsSuccessStatus: 200
};

app.use(express.json());

app.use(cors(corsOptions));

app.use(apiLogger);
app.use(morganMiddleware);

app.use("/", routerCommon);
app.use("/users", checkTokenAccess, routerUsers);
app.use("/groups", checkTokenAccess, routerGroups);
app.use("/auth", routerAuth);
app.use(routersHandleErrors);
app.use(methodsError);

process
  .on("uncaughtException", (error) => {
    logger.error(`${error} : uncaught exception thrown`);
    process.exit(1);
  })
  .on("unhandledRejection", (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });

app.listen(PORT, () => logger.info(`Server has been started on ${PORT} port`));

const startServer = async () => {
  await sequelize.authenticate();
  await User.sync();
  await Group.sync();
  await UserGroup.sync();
};

startServer()
  .then(() => {
    app.listen(PORT_FOR_DB, () =>
      logger.debug(authenticateMessage(PORT_FOR_DB, process.env.NODE_ENV))
    );
  })
  .catch((err) => logger.error(err));
