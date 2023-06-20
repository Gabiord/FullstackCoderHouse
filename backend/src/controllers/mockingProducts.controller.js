import { generateProduct } from "../utils.js"

export async function mockingProducts(request, response){
    try {
        let newProduct = generateProduct()
        let MockProducts = []
        for (let i=0; i<100; i+=1){
            MockProducts.push(newProduct);
        }
        response.send({status: "Success", payload: MockProducts})
    } catch (error) {
        console.error(error);
        response.status(500).send({error: error, message: "No se pudieron Mokear los productos"})
    }
}
