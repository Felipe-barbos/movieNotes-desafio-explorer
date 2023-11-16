const { hash, compare } = require("bcryptjs");

const AppError = require("../utils/AppError");

const knex = require("../database/knex");

const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");




class UsersController {

  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);


    const user_id = await userCreateService.execute({ name, email, password });


    response.json({
      message: "Usuário criado",
      id: user_id
    });


  }


  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const { id } = request.user;


    //buscando o usuário no BD
    const checkUser = await knex("users").where({ id: id }).first();

    //verificando se já existe usuário com o email criado
    const checkEmailUser = await knex("users").where({ email: email }).first();


    if (checkEmailUser && checkEmailUser.id === checkUser.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, checkUser.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }
    }

    const hashPassword = await hash(password, 8);

    //alterando dados do usuário no BD 
    await knex("users")
      .where({ id: id })
      .update({
        name: name,
        email: email,
        password: hashPassword,
        updated_at: new Date()
      });


    response.json({
      message: "Usuário atualiza com sucesso!"
    });

  }

  async showUser(request, response) {
    const { id } = request.params;

    const user = await knex.select("name", "email", "created_at").from("users").where({ id: id }).first();


    if (!user) {
      throw new AppError("Usuário não encontrado!");
    }

    response.json(
      user
    );
  }
}


module.exports = UsersController;