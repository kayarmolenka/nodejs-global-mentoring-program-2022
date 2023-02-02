export const ERROR_MESSAGE = {
  USER_ALREADY_EXIST: "A user with this login already exists.",
  USER_DOES_NOT_EXIST: "The requested user does not exist.",
  GROUP_ALREADY_EXIST: "A group with this name already exists.",
  GROUP_DOES_NOT_EXIST: "The requested group does not exist.",
  FORBIDDEN: "The access forbidden for you",
  DID_NOT_PROVIDE_TOKEN: "You did not provide token."
};
export const authenticateMessage = (port: number | string, env?: string) =>
  `Connection has been established successfully on ${port} port in ${env}environmental.`;

export const userDeletedMessage = (id: string) => `User with the id: ${id} has been deleted.`;
export const groupDeletedMessage = (id: string) => `Group with the id: ${id} has been deleted.`;
export const addedUsersToGroupMessage = (id: string) =>
  `User(s) were added to the group with id: ${id}`;
export const updatedMessage = (id: string) => `User with the id: ${id} has been updated.`;
export const updatedGroupMessage = (id: string) => `Group with the id: ${id} has been updated.`;
export const userAlreadyDeletedMessage = (id: string) => `User with the id: ${id} already deleted.`;
