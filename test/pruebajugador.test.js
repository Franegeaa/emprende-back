const request = require("supertest");
const app = require("../index");

const jugadorAlta = {
  Nombre: "Jorge",
  Apellido: "Carranza",
  FechaNacimiento: "1972-06-16",
  Goles: 0,
};
const jugadorModificacion = {
  Nombre: "Jugador modificado",
  Apellido: "Carranza",
  FechaNacimiento: "2002-05-18",
  Goles: 0,
};

// metodo get
describe("GET /api/jugadores", () => {
  it("Deberia devolver todos los jugadores", async () => {
    const res = await request(app).get("/api/jugadores");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdJugador: expect.any(Number),
          Nombre: expect.any(String),
          Apellido: expect.any(String),
          FechaNacimiento: expect.any(String),
          Goles: expect.any(Number),
        }),
      ])
    );
  });
});

// test route/albumes/:id GET
describe("GET /api/jugadores/:id", () => {
  it("Deberia devolver el jugador con el id 1", async () => {
    const res = await request(app).get("/api/jugadores/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdJugador: expect.any(Number),
        Nombre: expect.any(String),
        Apellido: expect.any(String),
        FechaNacimiento: expect.any(String),
        Goles: expect.any(Number),
      })
    );
  });
});

// metodo post test
describe("POST /api/jugadores", () => {
  it("Deberia devolver el jugador que acabo de crear", async () => {
    const res = await request(app).post("/api/jugadores").send(jugadorAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdJugador: expect.any(Number),
        Nombre: expect.any(String),
        Apellido: expect.any(String),
        FechaNacimiento: expect.any(String),
        Goles: expect.any(Number),
      })
    );
  });
});

// metodo put test
describe("PUT /api/jugadores/:id", () => {
  it("Deberia devolver el jugador con el id 11 modificado", async () => {
    const res = await request(app)
      .put("/api/jugadores/5")
      .send(jugadorModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/albumes/:id DELETE
describe("DELETE /api/jugadores/:id", () => {
  it("Deberia devolver el jugador con el id 11 borrado", async () => {
    const res = await request(app).delete("/api/jugadores/1");
    expect(res.statusCode).toEqual(200);
  });
});
