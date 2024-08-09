import express from 'express';
import { ProductManager } from "./productManager.js";
import { CartManager } from './cartManager.js';
import { productsRouter } from './routes/products.router.js';
import {cartsRouter} from './routes/carts.router.js' 
import { engine } from 'express-handlebars';;
import * as path from 'path';
import __dirname from '../utils.js';
import { Server } from 'socket.io';
import { createServer } from 'http';

const PORT = 8080;

const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

// Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "src", "views"));


app.get("/", async (req, res) =>{
    let allProducts = await productManager.getProducts()
    res.render("home", {
        title: "Productos",
        products: allProducts
    })
})

app.get('/realtimeproducts', async (req, res) => {
    let allProducts = await productManager.getProducts();
    res.render("realTimeProducts", {
        title: "Productos en Tiempo Real",
        products: allProducts
    });
});

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
  
    socket.emit('updateProducts', productManager.getProducts());
  
    socket.on('addProduct', async (product) => {
      await productManager.addProduct(product);
      const products = await productManager.getProducts();
      io.emit('updateProducts', products);
    });
  
    socket.on('deleteProduct', async (productId) => {
      await productManager.deleteProduct(productId);
      const products = await productManager.getProducts();
      io.emit('updateProducts', products);
    });
  });
  
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
