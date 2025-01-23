const UsersController = require("../user_crud_api/controllers/Users");
const User = require("../user_crud_api/models/User.model");
const { mockRequest, mockResponse } = require("jest-mock-req-res");

jest.mock("../user_crud_api/models/User.model");

describe("UsersController Error Handling", () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return 500 when database operation fails", async () => {

      User.find.mockRejectedValue(new Error("Database error"));

      await UsersController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });

  describe("getUserById", () => {
    it("should return 500 when database operation fails", async () => {
      req.params = { id: "some-id" };
      User.findOne.mockRejectedValue(new Error("Database error"));

      await UsersController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
    });
  });

  describe("createUser", () => {
    it("should return 500 when database operation fails", async () => {
      req.body = { name: "Test", email: "test@test.com", age: 25 };

      User.findOne.mockResolvedValue(null);

      User.create.mockRejectedValue(new Error("Database error"));

      await UsersController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
    });
  });

  describe("updateUser", () => {
    it("should return 500 when database operation fails", async () => {
      req.params = { id: "some-id" };
      req.body = { name: "Test", email: "test@test.com", age: 25 };
      User.findOneAndUpdate.mockRejectedValue(new Error("Database error"));

      await UsersController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
    });
  });

  describe("deleteUser", () => {
    it("should return 500 when database operation fails", async () => {
      req.params = { id: "some-id" };
      User.deleteOne.mockRejectedValue(new Error("Database error"));

      await UsersController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
    });
  });
});
