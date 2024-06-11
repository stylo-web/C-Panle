import { Router } from 'express';
import {
    addCategory,
    deleteCategory,
    getCategory,
    editCategory,
    getSingleCategory
} from '../controllers/categoriesController.js';
import upload from '../Middleware/upload.js';

const router = Router();



router.post('/', upload.single('image'), addCategory);
router.get('/', getCategory);
router.get('/:id', getSingleCategory);
router.patch('/:id', upload.single('image'), editCategory);
router.delete('/:id', deleteCategory);

export default router;
