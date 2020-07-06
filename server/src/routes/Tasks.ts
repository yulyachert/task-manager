import { Router } from 'express';

import { error404 } from 'src/controllers/Errors';
import {
    getTasksJson,
    deleteTask,
    getOneTask,
    createTask,
    editOneTask,
    getTasksOfOneUser
} from 'src/controllers/Tasks';

const router = Router();

router.get('/', getTasksJson);

router.patch('/edit/:id', editOneTask);

router.delete('/:id', deleteTask);

router.get('/:id', getOneTask);

router.post('/create', createTask);

router.get('/user/:id', getTasksOfOneUser);


// Если роутер не выбрал подходящий для запроса маршрут – используется этот
router.all('*', error404);

export default router;
