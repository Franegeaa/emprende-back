
const db = require("aa-sqlite");


async function CrearBaseSiNoExiste() {
  await db.open("./.data/autos.db");

  let existe = false;
  let res = null;

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
}

CrearBaseSiNoExiste().catch(console.error);

module.exports = CrearBaseSiNoExiste;
