import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom"
import { useCart } from '../context/CartContext';

function CartWidget() {

  const { totalProductos } = useCart()

  return (
    <div className="ml-4 flow-root lg:ml-6">
      <Link to="/carrito" className="group -m-2 flex items-center p-2">
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-gray-700 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalProductos}</span>
      </Link>
    </div>
  )
}

export default CartWidget;