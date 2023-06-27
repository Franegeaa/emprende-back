const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // Abrir la base de datos o crearla si no existe
  await db.open("./.data/tpi.db");

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'peliculas'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE peliculas( idPelicula INTEGER PRIMARY KEY AUTOINCREMENT, Titulo TEXT NOT NULL, Productor TEXT NOT NULL, FechaLanzamiento TEXT NOT NULL, DuracionMinutos INTEGER NOT NULL);"
    );
    console.log("Tabla peliculas creada!");

    await db.run(
      `INSERT INTO peliculas VALUES
      (1, 'Star Wars', 'George Lucas', '1977-06-01',139),
      (2, 'The Godfather', 'Francis Ford Coppola', '1972-03-15',158),
      (3, 'Pulp Fiction', 'Quentin Tarantino', '1994-10-14',165),
      (4, 'The Shawshank Redemption', 'Frank Darabont', '1994-09-23',184),
      (5, 'The Dark Knight', 'Christopher Nolan', '2008-07-18',152),
      (6, 'Inception', 'Christopher Nolan', '2010-07-16',148),
      (7, 'Fight Club', 'David Fincher', '1999-10-15',148),
      (8, 'The Matrix', 'The Wachowski Brothers', '1999-03-31',173),
      (9, 'Forrest Gump', 'Robert Zemeckis', '1994-07-06',142),
      (10, 'The Lord of the Rings: The Fellowship of the Ring', 'Peter Jackson', '2001-12-19',172);`
    );
  }
  existe = false;
  res = null;
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
  existe = false;
  res = null;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'autos'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
        "CREATE TABLE autos ( id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, marca TEXT NOT NULL, modelo TEXT NOT NULL, puertas INTEGER NOT NULL,fecha TEXT NOT NULL);"
    );
    console.log("Tabla autos creada!");

    await db.run(
    `INSERT INTO autos VALUES
      (1, 'Toyota Corolla', 'Toyota', 'Corolla', 4, '2022-03-15'),
      (2, 'Honda Civic', 'Honda', 'Civic', 4, '2022-02-28'),
      (3, 'Volkswagen Golf', 'Volkswagen', 'Golf', 4, '2021-12-10'),
      (4, 'Ford Mustang', 'Ford', 'Mustang', 2, '2022-06-05'),
      (5, 'Chevrolet Cruze', 'Chevrolet', 'Cruze', 4, '2021-11-20'),
      (6, 'BMW 3 Series', 'BMW', '3 Series', 4, '2022-01-07'),
      (7, 'Mercedes-Benz C-Class', 'Mercedes-Benz', 'C-Class', 4, '2022-04-18'),
      (8, 'Audi A4', 'Audi', 'A4', 4, '2021-09-30'),
      (9, 'Hyundai Elantra', 'Hyundai', 'Elantra', 4, '2022-05-12'),
      (10, 'Kia Forte', 'Kia', 'Forte', 4, '2021-10-25');`
    );
  }

  existe = false;
  res = null;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'albums'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE albums( IdAlbum INTEGER PRIMARY KEY AUTOINCREMENT, Titulo TEXT NOT NULL, Artista TEXT NOT NULL, FechaLanzamiento TEXT NOT NULL, idgenero INTEGER);"
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
