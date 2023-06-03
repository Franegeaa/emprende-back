const request = require("supertest");
const app = require("../app");
const jugadorAlta = {
  idJugador: 11,
  Nombre: "Jugador 102",
  FechaNac: "1972-06-16",
  Goles: 100,
};
const jugadorModificacion = {
  idJugador: 2,
  Nombre: "Jugador modificado",
  FechaNac: "2002-05-18",
  Goles: 100,
};

// metodo get
describe("GET /api/jugadores", () => {
  it("Deberia devolver todos los jugadores", async () => {
    const res = await request(app).get("/api/jugadores");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idJugador: expect.any(Number),
          Nombre: expect.any(String),
          FechaNac: expect.any(String),
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
        idJugador: expect.any(Number),
        Nombre: expect.any(String),
        FechaNac: expect.any(String),
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
        idJugador: expect.any(Number),
        Nombre: expect.any(String),
        FechaNac: expect.any(String),
        Goles: expect.any(Number),
      })
    );
  });
});

// metodo put test
describe("PUT /api/jugadores/:id", () => {
  it("Deberia devolver el jugador con el id 2 modificado", async () => {
    const res = await request(app)
      .put("/api/jugadores/1")
      .send(jugadorModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/albumes/:id DELETE
describe("DELETE /api/jugadores/:id", () => {
  it("Deberia devolver el jugador con el id 11 borrado", async () => {
    const res = await request(app).delete("/api/jugadores/11");
    expect(res.statusCode).toEqual(200);
  });
});
