const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // Abrir la base de datos o crearla si no existe
  await db.open("./.data/albumes.db");

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'albums'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE albums( IdAlbum INTEGER PRIMARY KEY AUTOINCREMENT, Titulo TEXT NOT NULL, Artista TEXT NOT NULL, FechaLanzamiento TEXT NOT NULL, IdGenero INTEGER);"
    );
    console.log("Tabla albums creada!");

    await db.run(
      `INSERT INTO albums VALUES
      (1,'Sgt. Pepper''s Lonely Hearts Club Band','The Beatles','1967-06-01',1),
      (2,'The Dark Side of the Moon','Pink Floyd','1973-03-01',2),
      (3,'Led Zeppelin IV','Led Zeppelin','1971-11-08',3),
      (4,'Thriller','Michael Jackson','1982-11-30',4),
      (5,'Nevermind','Nirvana','1991-09-24',5),
      (6,'Exile on Main St.','The Rolling Stones','1972-05-12',6),
      (7,'Highway 61 Revisited','Bob Dylan','1965-08-30',7),
      (8,'Purple Rain','Prince','1984-06-25',1),
      (9,'Pet Sounds','The Beach Boys','1966-05-16',2),
      (10,'The Rise and Fall of Ziggy Stardust and the Spiders from Mars','David Bowie','1972-06-16',3);`
    );
  }
}

CrearBaseSiNoExiste().catch(console.error);

module.exports =  CrearBaseSiNoExiste;
