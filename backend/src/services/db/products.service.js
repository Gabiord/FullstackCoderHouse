import productsModel from "./models/products.js"


class ProductServiceMongo {
    constructor() {
    }
  
    addProduct = async(prop) => {
    const newProduct = await productsModel.create(prop)
    return newProduct;
    }

    getProductsById = async(prop) => {
    const product = await productsModel.findById(prop)
    return product
    }

    checkStockById = async (item, quantity) => {
        const productCurrent = await productsModel.findById(item)
        const stock = productCurrent.product_stock
        
        if (stock >= quantity){
            productCurrent.product_stock = stock - quantity
            await productsModel.findByIdAndUpdate(productCurrent.id,productCurrent)
            return true
        }
        else{
            return false
        }

    }

    deleteProductById = async (prop) => {
        const result = productsModel.findByIdAndDelete(prop);
        return result
    }
}

export default ProductServiceMongo;




