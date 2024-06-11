import { Router } from 'express';
import {
    addFinish,
    deleteFinish,
    getFinishes,
    getFinishesBySubcategoryId,
    updateFinish
} from '../controllers/finishController.js';

const router = Router();

router.post('/:subcategoryId/finishes', addFinish);        
router.get('/finishes', getFinishes); 
router.get('/:subcategoryId/finishes', getFinishesBySubcategoryId);                 
router.patch('/finishes/:finishId', updateFinish);           
router.delete('/finishes/:finishId', deleteFinish);  

export default router;

