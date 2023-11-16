const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError");

class UserCreateService {

  constructor(userRepository) {
    this.userRepository = userRepository;
  }


  async execute({ name, email, password }) {
    //verificando se o e-mail é válido
    if (!email.includes("@") || !email.includes(".")) {
      throw new AppError("Digite um e-mail válido");
    }

    const checkuser = await this.userRepository.findByEmail(email);

    if (checkuser) {
      throw new AppError("Este e-mail já está em uso");
    }


    //verificando se a senha contém menos que 8 caracteres
    if (password.length < 8) {
      throw new AppError("Senha somente com 8 caracteres ou mais!");
    }

    //convertendo a senha para o hash
    const hashPassword = await hash(password, 8);

    //criando um usuário no BD
    const user_id = await this.userRepository.createUser({ name, email, password: hashPassword });

    return user_id;

  }
}


module.exports = UserCreateService;