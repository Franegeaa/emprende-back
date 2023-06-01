const request = require("supertest");
const app = require("../index");
const albumAlta = {
  IdAlbum: 11,
  Titulo: "The Rise and Fall of Ziggy Stardust and the Spiders from Mars",
  Artista: "David Bowie",
  FechaLanzamiento: "1972-06-16",
};
const albumModificacion = {
  IdArticulo: 1,
  Titulo: "Álbum 9hnpce69ey",
  Artista: "Artista d7lhlpr95x",
  FechaLanzamiento: "2023-05-18",
};

// test route/albumes GET
describe("GET /api/albumes", () => {
  it("Deberia devolver todos los albumes", async () => {
    const res = await request(app).get("/api/albumes");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdAlbum: expect.any(Number),
          Titulo: expect.any(String),
          Artista: expect.any(String),
          FechaLanzamiento: expect.any(String),
        }),
      ])
    );
  });
});

// test route/albumes/:id GET
describe("GET /api/albumes/:id", () => {
  it("Deberia devolver el album con el id 1", async () => {
    const res = await request(app).get("/api/albumes/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdAlbum: expect.any(Number),
        Titulo: expect.any(String),
        Artista: expect.any(String),
        FechaLanzamiento: expect.any(String),
      })
    );
  });
});

// test route/albumes POST
describe("POST /api/albumes", () => {
  it("Deberia devolver el album que acabo de crear", async () => {
    const res = await request(app).post("/api/albumes").send(albumAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdAlbum: expect.any(Number),
        Titulo: expect.any(String),
        Artista: expect.any(String),
        FechaLanzamiento: expect.any(String),
      })
    );
  });
});

// test route/albumes/:id PUT
describe("PUT /api/albumes/:id", () => {
  it("Deberia devolver el albumes con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/albumes/1")
      .send(albumModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/albumes/:id DELETE
describe("DELETE /api/albumes/:id", () => {
  it("Deberia devolver el album con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/albumes/1");
    expect(res.statusCode).toEqual(200);

    // baja logica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     IdArticulo: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );
  });
});
