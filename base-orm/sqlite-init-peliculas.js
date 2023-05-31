const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // Abrir la base de datos o crearla si no existe
  await db.open("./.data/peliculas.db");

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'peliculas'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE peliculas( idPelicula INTEGER PRIMARY KEY AUTOINCREMENT, Titulo TEXT NOT NULL, Productor TEXT NOT NULL, FechaLanzamiento TEXT NOT NULL);"
    );
    console.log("Tabla peliculas creada!");

    await db.run(
      `INSERT INTO peliculas VALUES
      (1, 'Star Wars', 'George Lucas', '1977-06-01'),
      (2, 'The Godfather', 'Francis Ford Coppola', '1972-03-15'),
      (3, 'Pulp Fiction', 'Quentin Tarantino', '1994-10-14'),
      (4, 'The Shawshank Redemption', 'Frank Darabont', '1994-09-23'),
      (5, 'The Dark Knight', 'Christopher Nolan', '2008-07-18'),
      (6, 'Inception', 'Christopher Nolan', '2010-07-16'),
      (7, 'Fight Club', 'David Fincher', '1999-10-15'),
      (8, 'The Matrix', 'The Wachowski Brothers', '1999-03-31'),
      (9, 'Forrest Gump', 'Robert Zemeckis', '1994-07-06'),
      (10, 'The Lord of the Rings: The Fellowship of the Ring', 'Peter Jackson', '2001-12-19');`
    );
  }
}

CrearBaseSiNoExiste().catch(console.error);

module.exports =  CrearBaseSiNoExiste;
