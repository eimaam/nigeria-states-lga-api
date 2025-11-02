import { Router } from 'express';
import stateRoutes from './stateRoutes';
import lgaRoutes from './lgaRoutes';
import healthRoutes from './healthRoutes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/states', stateRoutes);
router.use('/lgas', lgaRoutes);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🇳🇬 Welcome to Nigeria States & LGAs API',
    endpoints: {
      health: {
        'GET /api/health': 'Check API health status',
        'GET /api/health/ready': 'Check API readiness',
      },
      states: {
        'GET /api/states': 'Get all states',
        'GET /api/states?region=North-Central': 'Get states by region',
        'GET /api/states/grouped': 'Get states grouped by region',
        'GET /api/states/:id': 'Get state by ID',
        'GET /api/states/:id/lgas': 'Get state with all its LGAs',
        'GET /api/states/code/:code': 'Get state by code (e.g., LA for Lagos)',
      },
      lgas: {
        'GET /api/lgas': 'Get all LGAs',
        'GET /api/lgas/search?query=ikeja': 'Search LGAs by name',
        'GET /api/lgas/state/:stateId': 'Get LGAs by state ID',
        'GET /api/lgas/state-code/:stateCode': 'Get LGAs by state code',
      },
    },
    statistics: {
      states: 37,
      lgas: 774,
      regions: 6,
    },
    version: '1.0.0',
  });
});

export default router;

