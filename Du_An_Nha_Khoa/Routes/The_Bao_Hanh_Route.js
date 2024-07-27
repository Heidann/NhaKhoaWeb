import { Router } from 'express';
import {getAllThe_Bao_HanhController,
    getThe_Bao_HanhController,
    createThe_Bao_HanhController,
    updateThe_Bao_HanhController,
    deleteThe_Bao_HanhController} from '../Controllers/The_Bao_Hanh_Controller.js';

const router = Router();

router.get('/', getAllThe_Bao_HanhController);
router.get('/:id', getThe_Bao_HanhController);
router.post('/', createThe_Bao_HanhController);
router.put('/:id', updateThe_Bao_HanhController);
router.delete('/:id', deleteThe_Bao_HanhController);

export default router;