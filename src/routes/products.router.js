import { Router } from "express";
import { productManager } from "../index.js";
const productsRouter = Router()


productsRouter.get('/', async (req, res)=>{
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts()

        if(limit){
            const limitedProduts = products.slice(0, limit)
            return res.json(limitedProduts)
        }

        return res.json(products);

    } catch (error) {
        console.log(error);
        res.send('ERROR al intentar recibir los productos');
    }
})


productsRouter.get('/:pid', async (req, res)=>{
    const {pid} = req.params;
    try {
        const products = await productManager.getProductsById(pid)
        res.json(products)
    } catch (error) {
        console.log(error);
        res.send(`ERROR al intentar recibir el producto con ID ${pid}`)
    }
})

productsRouter.post('/', async (req, res)=>{
    try {
        const {title, description, price, code, stock, status = true, category} = req.body;
        const response = await productManager.addProduct({title, description, price, code, stock, status, category})
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send('ERROR al intentar agregar producto')
    }
})

productsRouter.put('/:pid', async (req, res)=>{
    const {pid} = req.params;

    try {
        const {title, description, price, code, stock, status = true, category} = req.body;
        const response = await productManager.updateProduct(pid, {title, description, price, code, stock, status, category});
        res.json(response);
    } catch (error) {
        console.log(error);
        res.send(`ERROR al intentar editar el producto con ID ${pid}`);
    }
})

productsRouter.delete('/:pid', async (req, res)=>{
    const {pid} = req.params;

    try {
        await productManager.deleteProduct(pid);
        res.send('producto eliminado con exito');
    } catch (error) {
        console.log(error);
        res.send(`ERROR al intentar eliminar el producto con ID ${pid}`);
    }


})


export {productsRouter}