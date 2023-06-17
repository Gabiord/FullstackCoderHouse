import { useState } from "react"
import { useContext } from "react"
import { createContext } from "react"
import { Notify } from "notiflix"

const context = createContext()
const Provider = context.Provider

export const useCart = () => {
    const valor = useContext(context)
    return valor
}

const CartContext = ({ children }) => {
    const inicioSt = localStorage.length > 0 ? (JSON.parse(localStorage.getItem("carrito"))) : [];
    const [cart, setCart] = useState(inicioSt);
    localStorage.setItem("carrito", JSON.stringify(cart))

    const inicioTP = cart.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0)
    const [totalProductos, setTotalProductos] = useState(inicioTP)

    const actualizarCartWidget = (array, suma) => {
        const cantidad = array.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
        setTotalProductos(cantidad + suma)
    }

    const agregarProductoAlCarrito = ({ producto }, cantidadContador, id) => {

        actualizarCartWidget(cart, cantidadContador);

        if (cart.some(product => product.id === id)) {
            const index = cart.findIndex(product => product.id === id)
            cart[index].quantity += cantidadContador
            cart[index].total = cart[index].price * cart[index].quantity
        }

        else {
            const productToCart = {
                id: id,
                title: producto.product_name,
                price: producto.product_price,
                image: producto.product_thumbnail,
                quantity: cantidadContador,
                total: producto.product_thumbnail * cantidadContador,
            }

            const copia = cart.slice(0)
            copia.push(productToCart)
            setCart(copia)
        }
        Notify.success('Se agrego un item al Carrito');
    }

    const eliminarProductoDelCarrito = (id) => {
        const copia = cart.filter(producto => producto.id !== id);
        setCart(copia)
        actualizarCartWidget(copia, 0);

    }

    const actualizarItemDelCarrito = (id, valor) => {
        const index = cart.findIndex(product => product.id === id)
        cart[index].quantity = valor;
        cart[index].total = cart[index].price * cart[index].quantity
        actualizarCartWidget(cart, 0);
    }


    const valorDelContexto = {
        cart: cart,
        totalProductos: totalProductos,
        setCart: setCart,
        setTotalProductos: setTotalProductos,
        agregarProductoAlCarrito: agregarProductoAlCarrito,
        eliminarProductoDelCarrito: eliminarProductoDelCarrito,
        actualizarItemDelCarrito: actualizarItemDelCarrito
    }

    return (
        <Provider value={valorDelContexto}>
            {children}
        </Provider>
    )
}

export default CartContext;