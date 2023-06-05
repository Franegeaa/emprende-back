const request = require("supertest");
const app = require("../index");
describe("GET /api/autos", ()=>{
    it("Deberia devolver cod 200 con un listado de autos no vacios", async()=>{
        const res = await request(app)
        .get('/api/autos')
        .set('Accept', 'application/json');
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nombre: expect.any(String),
                    marca: expect.any(String),
                    modelo: expect.any(String),
                    puertas: expect.any(Number),
                    fecha: expect.any(String)
                })
            ])
        );
    })
})
describe("GET /api/autos/:id", () => {
    it("Deberia devolver el auto con el id 10", async () => {
      const res = await request(app)
      .get("/api/autos/10")
      .set('Accept', 'application/json');
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            nombre: expect.any(String),
            marca: expect.any(String),
            modelo: expect.any(String),
            puertas: expect.any(Number),
            fecha: expect.any(String)
        })
      );
    });
  });

describe("POST /api/autos", ()=>{
    it("Deberia devolver 200 con un auto creado", async ()=>{
        const res = await request(app)
        .post("/api/autos")
        .set("Accept", "application/json")
        .send({
            "nombre": 'fiesta',
            "marca": "ford",
            "modelo": "2012",
            "puertas": 2,
            "fecha": "2000-12-05"
        });
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(

            expect.objectContaining({
                id: expect.any(Number),
                nombre: expect.any(String),
                marca: expect.any(String),
                modelo: expect.any(String),
                puertas: expect.any(Number),
                fecha: expect.any(String)
            })
    );
    })
})
describe("PUT /api/autos/:id", ()=>{
    it("Deberia devolver 200 con un auto modificado", async ()=>{
        const res = await request(app)
        .put("/api/autos/11")
        .set("Accept", "application/json")
        .send({
            "nombre": 'fiesta',
            "marca": "ford",
            "modelo": "2012",
            "puertas": 2,
            "fecha": "2000-05-01"
        });
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(

            expect.objectContaining({
                id: expect.any(Number),
                nombre: expect.any(String),
                marca: expect.any(String),
                modelo: expect.any(String),
                puertas: expect.any(Number),
                fecha: expect.any(String)

            })
    );
    })
})
describe("DELETE /api/autos/:id", ()=>{
    it("Deberia devolver 200 con un auto eliminado", async ()=>{
        const res = await request(app)
        .delete("/api/autos/10")
        .set("Accept", "application/json")
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({"message":'Auto eliminado correctamente'});
    })
})