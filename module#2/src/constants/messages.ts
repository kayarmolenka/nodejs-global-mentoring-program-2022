export const ERROR_MESSAGE = {
  USER_ALREADY_EXIST: "A user with this login already exists.",
  USER_DOES_NOT_EXIST: "The requested user does not exist."
};

export const userDeletedMessage = (id: string) => `User with the id: ${id} has been deleted.`;
export const updatedMessage = (id: string) => `User with the id: ${id} has been updated.`;
export const userAlreadyDeletedMessage = (id: string) => `User with the id: ${id} already deleted.`;
export const authenticateMessage = "Connection has been established successfully.";
