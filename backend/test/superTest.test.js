import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing Aplitivo Backend", ()=>{

    describe("a) Testing de api/products", ()=>{

        //Test 01
        it("El endpoint POST /api/products/savenewproduct debe crear un producto correctamente", async()=>{

            //Given
            const productMock= {
                name: "Zapatos Azules",
                description:"Zapatos Azules talla 38",
                price:2300,
                category:"Vestimenta",
                code:"TEST07",
                thumbnail:"URL DE IMAGEN",
                stock:32,
                status:true
            }

            //Then
            const {_body,ok, statusCode} = await requester.post('/api/products/savenewproduct').send(productMock)
            console.log(statusCode);
            console.log(ok);
            console.log(_body);

            //Assert that
            expect(statusCode).is.eqls(201);
            expect(_body._id).is.ok




        })

    })

    // describe("Testing de api/carts", ()=>{

    // })

    // describe("Testing de api/sessions", ()=>{

    // })



})
