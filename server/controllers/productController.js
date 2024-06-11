import Product from '../models/Product.js';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add a new product
export const addProduct = async (req, res) => {
    try {
        // Extract data from the request body
        const { category, subcategory, finish } = req.body;
        const images = req.files.map(file => file.filename);

        // Create a new product instance
        const newProduct = new Product({
            category: category,
            subcategory: subcategory,
            finish: finish,
            images
        });

        // Save the new product to the database
        await newProduct.save();

        res.status(201).json({ success: true, message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, message: 'Failed to add product' });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('subcategory', 'size')
            .populate('finish', 'name')
            .populate('category', 'name')

res.status(200).json(products);
    } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
}
};


// Get a specific product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id)
            .populate('category', 'name')
            .populate('subcategory', 'size')
            .populate('finish', 'name');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Failed to fetch product' });
    }
};



// Edit a product
export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, subcategory, finish } = req.body;
        const images = req.files.length > 0 ? req.files.map(file => file.filename) : null;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.category = category
        product.subcategory = subcategory
        product.finish = finish

        if (images) {
            for (const image of product.images) {
                await fs.unlink(path.join(__dirname, '../uploads', image));
            }
            product.images = images;
        }

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        for (const image of product.images) {
            await fs.unlink(path.join(__dirname, '../uploads', image));
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};