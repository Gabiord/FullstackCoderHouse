import cartService from "../services/db/cart.service.js";
import { productService } from "../services/factory.js";

const CartService = new cartService()

export async function finalizarCompra(request, response){
    try {
        let cid = request.params.cid;
        let cart = request.body.cart; 


        let cartDefinitivo = []
        let cartPendiente = []


        for (const producto of cart){
            let item = producto.id
            let quantity = producto.quantity;
        
            let check = await productService.checkStockById(item, quantity)

            if(check){
                cartDefinitivo.push({item, quantity})
            }
            else{
                cartPendiente.push({item, quantity})
            }
        }

        console.log(cartDefinitivo)
        console.log("----------------------------")
        console.log(cartPendiente)

        const amountDefinitivo = cartDefinitivo.map(item => item.total).reduce((prev, curr) => prev + curr, 0)

        const newCart = {
            cart_idUsuario: "6461147dd320e5712d24fdc7",
            cart_products: cartDefinitivo
        }

        const guardarCartenBD= await CartService.createNewCart(newCart)


        const ticket = {
                ticket_code: request.body.code,
                ticket_purchase_datetime: request.body.purchase_datetime,
                ticket_amount: amountDefinitivo,
                ticket_purchaser: request.body.purchaser
        }

        response.status(200).json({ticket, cartPendiente})        
    
    } catch (error) {
        response.status(400).json(error.message)
        
    }
    

}





