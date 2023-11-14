const knexfile = require("../../knexfile");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieNotesController {


  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { id: user_id } = request.user;

    if (!title) {
      throw new AppError("Título não definido!");
    }

    if (rating > 5) {
      throw new AppError("Digite um valor 0 a 5 no raking");
    }

    if (!tags) {
      throw new AppError("Obrigatório a tag!");
    }

    //criando um note_movie no bd
    const [movieNote_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    //inserindo o id da nota nas tags vinculadas e declaradas 

    const tagsInsert = tags.map(name => {
      return {
        movieNote_id,
        name,
        user_id
      }
    });

    //updando cada tags no bd

    await knex("movie_tags").insert(tagsInsert);

    response.json({
      message: "Nota do movie criada do sucesso!"
    });
  }

  async show(request, response) {
    const { id } = request.params;

    //bucando nota do filme através do seu id
    const movieNote = await knex("movie_notes").where({ id }).first();

    //procurando todas as tags declaradas que estejam vinculadas no id da nota
    const tags = await knex("movie_tags").where({ movieNote_id: id });

    return response.json({
      ...movieNote,
      tags
    });

  }

  async delete(request, response) {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const movieNote = await knex("movie_notes").where({ id }).first();


    if (movieNote.user_id != user_id) {
      throw new AppError("Usuário não permitido!");
    }

    await knex("movie_notes").where({ id }).delete();

    return response.json({
      message: "Nota do filme deletada com sucesso!"
    });
  }


  async index(request, response) {
    const { title } = request.query;
    const { id: user_id } = request.user;

    let movieNotes;

    if (title) {
      movieNotes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");

    } else {
      movieNotes = await knex("movie_notes")
        .where({ user_id })
        .orderBy("title")
    }




    const userTags = await knex("movie_tags").where({ user_id });


    //pegando todas as tags e vinculando ao movieNote 
    const movieNotesWithTags = movieNotes.map(movieNote => {
      const movieNotesTags = userTags.filter(tag => tag.movieNote_id === movieNote.id);

      return {
        ...movieNote,
        tags: movieNotesTags
      }
    });

    return response.json({ movieNotesWithTags });
  }


};

module.exports = MovieNotesController;