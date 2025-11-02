import { Router } from 'express';
import { LgaController } from '../controllers/lgaController';

const router = Router();

router.get('/', LgaController.getAllLgas);
router.get('/search', LgaController.searchLgas);
router.get('/state/:stateId', LgaController.getLgasByStateId);
router.get('/state-code/:stateCode', LgaController.getLgasByStateCode);

export default router;

