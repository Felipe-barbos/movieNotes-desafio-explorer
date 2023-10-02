//importante as config do knexfile

const config = require("../../../knexfile");

//importando o knex

const knex = require("knex");

//realizando a conexão do knex com o arquivo do BD configurado

const connection = knex(config.development);



module.exports = connection;