import Product from "../models/product.js";

// Método para obtener productos con paginación, filtrado y ordenamiento
export const getProducts = async (req, res) => {
    try {
        // Se obtienen los parámetros de consulta desde la URL
        const { limit = 10, page = 1, sort, query } = req.query;

        // Se define el filtro de búsqueda si se proporciona un parámetro 'query'
        const filter = query ? { $or: [{ category: query }, { title: query }] } : {};

        // Se determina el orden de los resultados (ascendente o descendente) si se proporciona un parámetro 'sort'
        const sortOrder = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;

        // Se configuran las opciones de paginación, incluyendo límite, página y ordenamiento
        const options = {
            limit: parseInt(limit), // Limita la cantidad de productos devueltos
            page: parseInt(page),   // Define la página actual
            sort: sortOrder ? { price: sortOrder } : {} // Ordena por precio si se especifica
        };

        // Se utiliza la paginación y el filtro para obtener los productos
        const products = await Product.paginate(filter, options);

        // Respuesta con los productos obtenidos
        res.json(products);
    } catch (error) {
        // En caso de error, se envía una respuesta con el mensaje de error
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Método para obtener un producto por su ID
export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await Product.findById(pid);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Método para crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// Método para actualizar un producto por su ID
export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// Método para eliminar un producto por su ID
export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        await Product.findByIdAndDelete(pid);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};
