const { hash } = require("bcryptjs");
const knex = require("../database/knex");

class UserRepository {

  async findByEmail(email) {
    //verificando se já existe usuário com o email criado
    const user = await knex("users").where({ email: email }).first();

    return user;
  }

  async createUser({ name, email, password }) {


    //convertendo a senha para o hash
    const hashPassword = await hash(password, 8);


    const [user_id] = await knex("users").insert({
      name,
      email,
      password: hashPassword,
    });

    return { id: user_id };
  }

}

module.exports = UserRepository;