// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/jugadores.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'jugadores'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE jugadores( IdJugadores INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL, FechaNac text NOT NULL);"
    );
    console.log("tabla jugadores creada!");
    await db.run(
      `INSERT INTO jugadores VALUES
        (1,'Jugador1', '1998-01-19'),
        (2,'Jugador2', '1999-02-20'),
        (3,'Jugador3', '1997-04-06'),
        (4,'Jugador4', '2002-10-19'),
        (5,'Jugador5', '1987-10-01'),
        (6,'Jugador6', '1999-05-12'),
        (7,'Jugador7', '1979-01-15'),
        (8,'Jugador8', '2000-01-17'),
        (9,'Jugador9', '2004-01-09'),
        (10,'Jugador10', '2002-01-01'),
        `
    );
  }
}

CrearBaseSiNoExiste().catch(console.error);

module.exports = CrearBaseSiNoExiste;
