const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

const path = require("path");


//função que iniciará a conexão com o bando de dados.
async function sqliteConnection() {
  const database = await sqlite.open({

    //local onde o arquivo do bd irá ser salvo
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  });

  return database;

}


module.exports = sqliteConnection;


// SGBD - Sistema Gerenciador de Banco