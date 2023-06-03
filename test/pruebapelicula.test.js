const request = require("supertest");
const app = require("../index");
const peliculaAlta = {
  idPelicula: 11,
  Titulo: "Los vengadores",
  Productor: "Marvel",
  FechaLanzamiento: "1972-06-16",
  DuracionMinutos: 120
};
const peliculaModificacion = {
  idPelicula: 2,
  Titulo: "Pelicula modificada",
  Productor: "Productor modificado",
  FechaLanzamiento: "2023-05-18",
  DuracionMinutos: 154
};

// metodo get
describe("GET /api/peliculas", () => {
  it("Deberia devolver todos las peliculas", async () => {
    const res = await request(app).get("/api/peliculas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idPelicula: expect.any(Number),
          Titulo: expect.any(String),
          Productor: expect.any(String),
          FechaLanzamiento: expect.any(String),
          DuracionMinutos: expect.any(Number),
        }),
      ])
    );
  });
});

// test route/albumes/:id GET
describe("GET /api/peliculas/:id", () => {
  it("Deberia devolver la peliculas con el id 1", async () => {
    const res = await request(app).get("/api/peliculas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idPelicula: expect.any(Number),
        Titulo: expect.any(String),
        Productor: expect.any(String),
        FechaLanzamiento: expect.any(String),
        DuracionMinutos: expect.any(Number),
      })
    );
  });
});

// metodo post test
describe("POST /api/peliculas", () => {
  it("Deberia devolver la peliculas que acabo de crear", async () => {
    const res = await request(app).post("/api/peliculas").send(peliculaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idPelicula: expect.any(Number),
        Titulo: expect.any(String),
        Productor: expect.any(String),
        FechaLanzamiento: expect.any(String),
        DuracionMinutos: expect.any(Number),
      })
    );
  });
});

// metodo put test
describe("PUT /api/peliculas/:id", () => {
  it("Deberia devolver la pelicula con el id 2 modificado", async () => {
    const res = await request(app)
      .put("/api/peliculas/1")
      .send(peliculaModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/albumes/:id DELETE
describe("DELETE /api/peliculas/:id", () => {
  it("Deberia devolver la pelicula con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/peliculas/1");
    expect(res.statusCode).toEqual(200);
  });
});
