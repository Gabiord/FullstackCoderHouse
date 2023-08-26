import cartService from "../services/db/cart.service.js";
import { productService } from "../services/factory.js";
import { sendEmail } from "../controllers/email.controller.js";


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
            let total = producto.total
        
            let check = await productService.checkStockById(item, quantity)

            if(check){
                cartDefinitivo.push({item, quantity, total})
            }
            else{
                cartPendiente.push({item, quantity, total})
            }
        }

        console.log(cartDefinitivo)
        console.log("----------------------------")
        console.log(cartPendiente)

        const amountDefinitivo = cartDefinitivo.map(item => item.total).reduce((prev, curr) => prev + curr, 0)

        const newCart = {
            cart_idUsuario: cid,
            cart_products: cartDefinitivo
        }

        await CartService.createNewCart(newCart)

        const ticket = {
                ticket_code: request.body.code,
                ticket_purchase_datetime: request.body.purchase_datetime,
                ticket_amount: amountDefinitivo,
                ticket_purchaser: request.body.purchaser
        }

        await sendEmail(ticket)

        response.status(200).json(cartPendiente)        
    
    } catch (error) {
        response.status(400).json(error.message)
        
    }
    
}





