const request = require("supertest");

describe("GET /autos", ()=>{
    it("Deberia devolver cod 200 con un listado de autos no vacios", async()=>{
        const res = await request("localhost:3000")
        .get('/autos')
        .set('Accept', 'application/json');
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nombre: expect.any(String),
                    marca: expect.any(String),
                    modelo: expect.any(String),
                    fecha: expect.any(String),
                    puertas: expect.any(Number),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
            ])
        );
    })
    it("Deberia devolver error", async()=>{
        const res = await request("localhost:3000")
        .get('/autos')
        .set('Accept', 'application/json');
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(

                expect.objectContaining({
                    id: expect.any(Number),
                    nombre: expect.any(String),
                    marca: expect.any(String),
                    modelo: expect.any(String),
                    fecha: expect.any(String),
                    puertas: expect.any(Number),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
        );
    })
})

describe("POST /autos", ()=>{
    it("Deberia devolver 200 con un auto creado", async ()=>{
        const res = await request('localhost:3000')
        .post("/autos")
        .set("Accept", "application/json")
        .send({
            "nombre": 'fiesta',
            "marca": "ford",
            "modelo": "2012",
            "fecha": "2000",
            "puertas": 2,
            "createdAt": 'fecha1',
            "updatedAt": 'fecha2'
        });
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(

            expect.objectContaining({
                id: expect.any(Number),
                nombre: expect.any(String),
                marca: expect.any(String),
                modelo: expect.any(String),
                fecha: expect.any(String),
                puertas: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            })
    );
    })
})
describe("PUT /autos/:id", ()=>{
    it("Deberia devolver 200 con un auto modificado", async ()=>{
        const res = await request('localhost:3000')
        .put("/autos/6")
        .set("Accept", "application/json")
        .send({
            "nombre": 'fiesta',
            "marca": "ford",
            "modelo": "2012",
            "fecha": "2000",
            "puertas": 2,
            "createdAt": 'fecha1',
            "updatedAt": 'fecha2'
        });
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(

            expect.objectContaining({
                id: expect.any(Number),
                nombre: expect.any(String),
                marca: expect.any(String),
                modelo: expect.any(String),
                fecha: expect.any(String),
                puertas: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            })
    );
    })
})
describe("DELETE /autos/:id", ()=>{
    it("Deberia devolver 200 con un auto eliminado", async ()=>{
        const res = await request('localhost:3000')
        .delete("/autos/8")
        .set("Accept", "application/json")
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({"message":'Auto eliminado correctamente'});
    })
})