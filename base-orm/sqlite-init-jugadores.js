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
      "CREATE TABLE jugadors( IdJugador INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL, Apellido TEXT NOT NULL, FechaNacimiento TEXT NOT NULL, Goles INTEGER);"
    );
    console.log("Tabla jugadors creada!");

    await db.run(
      `INSERT INTO jugadors VALUES
      (1,'Lionel',' Messi','1967-06-01',800),
      (2,'Cristiano','Ronaldo','1973-03-01',830),
      (3,'Neymar','Jr.','1971-11-08',500),
      (4,'Mohamed','Salah','1982-11-30',300),
      (5,'Harry','Kane','1991-09-24',320),
      (6,'Kylian','Mbappé','1972-05-12',200),
      (7,'Sergio','Ramos','1965-08-30',60),
      (8,'Kevin','De Bruyne','1984-06-25',120),
      (9,'Robert','Lewandowski','1966-05-16',600),
      (10,'Manuel','Neuer','1972-06-16',1);`
    );
  }
}

CrearBaseSiNoExiste().catch(console.error);

module.exports = CrearBaseSiNoExiste;
