import morgan, { StreamOptions } from "morgan";
import { logger } from "../loaders";

const stream: StreamOptions = {
  write: (message) => logger.http(message)
};

export const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);
