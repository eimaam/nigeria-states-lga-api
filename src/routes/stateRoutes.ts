import { Router } from 'express';
import { StateController } from '../controllers/stateController';

const router = Router();

router.get('/', StateController.getAllStates);
router.get('/grouped', StateController.getStatesGroupedByRegion);
router.get('/:id', StateController.getStateById);
router.get('/:id/lgas', StateController.getStateWithLgas);
router.get('/code/:code', StateController.getStateByCode);

export default router;

