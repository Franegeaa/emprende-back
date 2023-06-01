// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");
// Abrir la base de datos o crearla si no existe
async function CrearBaseSiNoExiste() {
  await db.open("./.data/jugadoresdb.db");

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'jugadors'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE jugadors( IdJugador INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL, Apellido TEXT NOT NULL, FechaNacimiento TEXT NOT NULL, IdGenero INTEGER);"
    );
    console.log("Tabla jugadors creada!");

    await db.run(
      `INSERT INTO jugadors VALUES
      (1,'Lionel',' Messi','1967-06-01',1),
      (2,'Cristiano','Ronaldo','1973-03-01',2),
      (3,'Neymar','Jr.','1971-11-08',3),
      (4,'Mohamed','Salah','1982-11-30',4),
      (5,'Harry','Kane','1991-09-24',5),
      (6,'Kylian','Mbappé','1972-05-12',6),
      (7,'Sergio','Ramos','1965-08-30',7),
      (8,'Kevin','De Bruyne','1984-06-25',1),
      (9,'Robert','Lewandowski','1966-05-16',2),
      (10,'Manuel','Neuer','1972-06-16',3);`
    );
  }
}

CrearBaseSiNoExiste().catch(console.error);

module.exports = CrearBaseSiNoExiste;
