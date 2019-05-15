import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { ProjectModel } from '../schemas/project';
import { formatOutput } from '../utility/apiUtils';
import { APILogger } from '../utility/logger';

// CREATE
export async function addProject(req: Request, res: Response, next: NextFunction) {
    APILogger.logger.info(`[POST] [/project/] ${JSON.stringify(req.body)}`);
    try {
        const project = new ProjectModel(req.body);
        const newProject = await project.save();
        return formatOutput(res, newProject, 201, 'project')
    } catch (e) {
        APILogger.logger.info(`[POST] [/project/] Couldn't create project: ${JSON.stringify(req.body)}`);
        return res.status(400).send(e);
    }
}

// READ
export async function getProject(req: Request, res: Response, next: NextFunction) {
    const id = req.params.projectId;
    APILogger.logger.info(`[GET] [/project/${id}]`);
    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID supplied');
    }
    try {
        const project = await ProjectModel.findById(id).exec();
        if (!project) {
            APILogger.logger.info(`[GET] [/project/${id}] Project with id ${id} not found`);
            return res.status(404).send('Project not found');
        }
        return formatOutput(res, project, 200, 'project')
    } catch (e) {
        APILogger.logger.error(`[GET] [/project/${id}] ${e}`);
        throw new Error(`Failed to GET project with id:${id}. ${e}`,)
    }
}

// UPDATE
export async function updateProject(req: Request, res: Response, next: NextFunction) {
    const id = req.params.projectId;
    APILogger.logger.info(`[PATCH] [/project/${id}] ${JSON.stringify(req.body)}`);
    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid project supplied');
    }
    try {
        const project = await ProjectModel.findById(id).exec();
        if (!project) {
            APILogger.logger.info(`[PATCH] [/project/${id}] Project with id ${id} not found`);
            return res.status(404).send('Project not found');
        } else {
            project.title = req.body.title || project.title;
            project.subtitle = req.body.subtitle || project.subtitle;
            project.description = req.body.description || project.description;
            project.type = req.body.type || project.type;
            project.tags = req.body.tags || project.tags;
            project.images = req.body.images || project.images;
            await project.save();
            return formatOutput(res, project, 200, 'project')
        }
    } catch (e) {
        APILogger.logger.error(`[PATCH] [/project/${id}] ${e}`);
        throw new Error(`Failed to UPDATE project with id:${id}. ${e}`,)
    }
}

// DELETE
export async function deleteProject(req: Request, res: Response, next: NextFunction) {
    const id = req.params.projectId;
    APILogger.logger.warn(`[DELETE] [/project/${id}]`);
    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID supplied');
    }
    try {
        const project = await ProjectModel.findById(id).exec();
        if (!project) {
            APILogger.logger.warn(`[DELETE] [/project/${id}] Project with id ${id} not found`);
            return res.status(404).send('Project not found');
        } else {
            const project2 = await ProjectModel.findByIdAndDelete(id).exec();
            return formatOutput(res, project2, 200, 'project')
        }
    } catch (e) {
        APILogger.logger.error(`[DELETE] [/project/${id}] ${e}`);
        throw new Error(`Failed to DELETE project with id:${id}. ${e}`,)
    }
}

export async function getProjectList(req: Request, res: Response, next: NextFunction) {
    APILogger.logger.info(`[GET] [/project]`);
    const projects = await ProjectModel.find({}).exec();
    return res.status(200).send(projects);
}