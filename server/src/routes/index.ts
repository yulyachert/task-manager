import { Router } from 'express';
import TasksRouter from 'src/routes/Tasks';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/tasks', TasksRouter);

// Export the base-router
export default router;
