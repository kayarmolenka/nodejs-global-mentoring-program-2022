import { checkTokenAccess } from "../middlewares/authorization";
import { Response, Request, NextFunction } from "express";
import { ERROR_MESSAGE } from "../constants";

describe("authorization", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  it("should return ERROR_MESSAGE.FORBIDDEN when wrong token provided", async () => {
    mockRequest = {
      headers: {
        authorization: "Bearer abc"
      }
    };
    mockResponse = {
      status: jest.fn(),
      json: jest.fn()
    };

    await checkTokenAccess(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toHaveBeenCalledWith(ERROR_MESSAGE.FORBIDDEN);
  });

  it("should return ERROR_MESSAGE.DID_NOT_PROVIDE_TOKEN error when access token does not provided", async () => {
    mockRequest = {
      headers: {
        authorization: undefined
      }
    };
    mockResponse = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
      json: jest.fn()
    };

    await checkTokenAccess(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith(ERROR_MESSAGE.DID_NOT_PROVIDE_TOKEN);
  });
});
