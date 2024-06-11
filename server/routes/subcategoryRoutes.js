import { Router } from "express";
import { addSubcategory, deleteSubcategory, getSubcategories, getSubcategoriesByCategory, updateSubcategory } from "../controllers/subcategoriesController.js";


const router = Router();

router.post('/:categoryId/subcategories', addSubcategory);
router.get('/subcategories', getSubcategories);
router.patch('/subcategories/:subcategoryId', updateSubcategory);
router.delete('/subcategories/:subcategoryId', deleteSubcategory);
router.get('/:categoryId', getSubcategoriesByCategory);

export default router;

