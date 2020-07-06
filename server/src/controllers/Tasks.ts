import { Request, Response } from 'express';

import Tasks from 'src/models/Tasks';
import User from 'src/models/User'
import {error404} from "src/controllers/Errors";

export async function getTasks(req: Request, res: Response): Promise<Tasks[]> {
    const tasks =  (await Tasks.findAll({
        attributes: ['id', 'title', 'completed'],
        include: [
            {
                // @ts-ignore
                model: User,
                attributes: ['id','name']
            }
        ]
    }));

    return tasks;
}

export async function getTasksJson(req: Request, res: Response): Promise<void> {
    const tasks =  await getTasks(req, res);

    res.send(tasks);
}

export async function deleteTask(req: Request, res: Response): Promise<void> {
    const task = await Tasks.findByPk(Number(req.params.id));
    if (task === null) {
        return error404(req, res);
    }

    await task.destroy();

    res.sendStatus(200);
}

export async function createTask(req: Request, res: Response): Promise<void> {
    await Tasks.create(req.body);

    res.sendStatus(201);
}

export async function editOneTask(req: Request, res: Response): Promise<void> {
    await Tasks.update(req.body, {where: {id: Number(req.params.id)}});

    res.sendStatus(200);
}

export async function getOneTask(req: Request, res: Response): Promise<void> {
    const task = await Tasks.findByPk(Number(req.params.id));

    res.send(task);
}

export async function getTasksOfOneUser(req: Request, res: Response): Promise<void> {
    const tasks =  await getTasks(req, res);

    res.send(tasks.filter((task) => task.user.id === Number(req.params.id)));
}

