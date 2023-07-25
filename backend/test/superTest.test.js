import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing Aplitivo Backend", ()=>{

    describe("a) Testing de api/products", async()=>{

        //Test 01
        it("El endpoint POST /api/products/savenewproduct debe crear un producto correctamente", async()=>{

            //Given
            const productMock= {
                name: "Zapatos Azules",
                description:"Zapatos Azules talla 38",
                price:2300,
                category:"Vestimenta",
                code:"TEST13",
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

        //Testing 02
        it("El endpoint GET /api/product debe regresar un array con todos los productos", async()=>{

            //Then
            const {_body,ok, statusCode} = await requester.get('/api/products')
            console.log(statusCode);
            console.log(ok);
            console.log(_body.payload)

            //Assert that
            expect(statusCode).eqls(200)
            expect(_body.payload).to.be.an('array')
        })

        //Testing 03
        it("El endpoint GET /api/product/:id debe regresar un objeto correspondiente al id enviado", async()=>{

            //Given
            const id = "64484735f15e190a5595ef1b"

            //Then
            const {_body,ok, statusCode} = await requester.get(`/api/products/${id}`)
            console.log(statusCode);
            console.log(ok);
            console.log(_body)

            //Assert that
            expect(statusCode).is.eqls(200)
            expect(_body._id).is.eqls(id)

        })

    })

    // describe("b) Testing de api/carts", ()=>{
        
    // })

    describe("c) Testing de api/sessions", ()=>{

        //Given global
        const mockUser = {
            first_name: "Gabi Pruebas 01",
            last_name: "Ordoñez Prueba 01",
            age: 29,
            email: "holaprueba@gmail.com",
            password: "1234prueba"
        }

        //Test 01
        it("El endpoint POST /api/sessions/register debe crear un usuario correctamente", async function() {

            //Then 
            const {_body,ok, statusCode} = await requester.post('/api/sessions/register').send(mockUser)
            console.log(statusCode);
            console.log(_body);
            console.log(ok)


            //Assert that 
            expect(statusCode).is.eqls(200);

        })

        it("El endpoint POST /api/sessions/login debe debolver un string con el token del usuario", async function() {

            //Given
            const mockLogin = {
                email : mockUser.email,
                password : mockUser.password
            }

            //Then 
            const {_body,ok, statusCode} = await requester.post('/api/sessions/login').send(mockLogin)

            console.log(statusCode);
            console.log(_body);
            console.log(ok)

            //Assert that 
            expect(statusCode).is.eqls(200);
            expect(_body).not.to.be.undefined;
            expect(_body).not.to.be.null;
            
        })

    })

})
