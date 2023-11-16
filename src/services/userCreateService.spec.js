
const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {

  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);

  });


  it("User should be create", async () => {
    const user = {
      name: "Test 1",
      email: "teste@gmail.com",
      password: "testeteste"
    }


    const userCreated = await userCreateService.execute(user);
    expect(userCreated).toHaveProperty("id");
  });



  it("should be not created user if email alrealy exists", async () => {

    const user = {
      name: "Test 1",
      email: "teste@gmail.com",
      password: "testeteste"
    }

    const user2 = {
      name: "Test 2",
      email: "teste@gmail.com",
      password: "testeteste"
    }

    await userCreateService.execute(user);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso"));
  });
});
