import { UsersDbService } from "../services";
import { mockUsers } from "../mock";
import { NextFunction, Request, Response } from "express";
import httpMocks, { MockRequest, MockResponse } from "node-mocks-http";
import { getAllUsers } from "../api/controllers";

describe("users controllers", () => {
  let userService: UsersDbService;
  beforeEach(() => {
    userService = new UsersDbService();
  });

  it("should return two users with loginSubstring ali", async () => {
    userService.getAutoSuggestUsers = jest.fn().mockReturnValue(mockUsers);
    const mockQuery = {
      loginSubstring: "ali",
      limit: 2
    };

    const mockReq: MockRequest<Request> = httpMocks.createRequest({
      method: "GET",
      url: "/users",
      query: mockQuery
    });
    const mockRes: MockResponse<Response> = httpMocks.createResponse();
    const mockNext: jest.Mocked<NextFunction> = jest.fn();

    await getAllUsers(mockReq, mockRes, mockNext);

    expect(mockRes._getJSONData()).toEqual([
      {
        age: 2,
        id: "f754f78a-c443-4363-bfbb-f239d7e327a6",
        isDeleted: false,
        login: "Alina",
        password: "Ez538F"
      },
      {
        age: 3,
        id: "3588099a-0e53-4225-9628-f860f0bdae19",
        isDeleted: true,
        login: "Alisa",
        password: "vHkLkhv4NdD"
      }
    ]);
  });

  it("should return four users when limit is 4", async () => {
    userService.getAutoSuggestUsers = jest.fn().mockReturnValue(mockUsers);
    const mockQuery = {
      limit: 4
    };

    const mockReq: MockRequest<Request> = httpMocks.createRequest({
      method: "GET",
      url: "/users",
      query: mockQuery
    });
    const mockRes: MockResponse<Response> = httpMocks.createResponse();
    const mockNext: jest.Mocked<NextFunction> = jest.fn();

    await getAllUsers(mockReq, mockRes, mockNext);

    const expectedResult = mockUsers
      .sort((a, b) => a.login.localeCompare(b.login))
      .slice(0, mockQuery.limit);

    expect(mockRes._getJSONData()).toEqual(expectedResult);
  });
});
