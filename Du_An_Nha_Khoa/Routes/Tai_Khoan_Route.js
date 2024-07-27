import { Router } from 'express';
import {getAllTai_KhoanController,
    getTai_KhoanController,
    createTai_KhoanController,
    updateTai_KhoanController,
    deleteTai_KhoanController,
    getTai_Khoan_UserController,
    getTai_Khoan_User_PassController} from '../Controllers/Tai_Khoan_Controller.js';

const router = Router();

router.get('/', getAllTai_KhoanController);
router.get('/:id', getTai_KhoanController);
router.get('/:Ten_Tai_Khoan', getTai_Khoan_UserController);
router.get('/tai-khoan/:TEN_TAI_KHOAN/:MAT_KHAU', getTai_Khoan_User_PassController);
router.post('/', createTai_KhoanController);
router.put('/:id', updateTai_KhoanController);
router.delete('/:id', deleteTai_KhoanController);


export default router;