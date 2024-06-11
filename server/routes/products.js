
import { Router } from 'express';
import { addProduct, deleteProduct, editProduct, getAllProducts, getProductById } from '../controllers/productController.js';
import upload from '../Middleware/upload.js';

const router = Router();



router.post('/products', upload.array('images', 5), addProduct);
router.get('/products/all', getAllProducts);
router.get('/:id/products', getProductById);
router.patch('/:id/products', upload.array('images', 5), editProduct);
router.delete('/:id/products', deleteProduct);

export default router;
