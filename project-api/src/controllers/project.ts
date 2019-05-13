import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { ProjectModel } from '../schemas/project';
import { formatOutput } from '../utility/apiUtils';

// CREATE
export async function addProject(req: Request, res: Response, next: NextFunction) {
    try {
        const project = new ProjectModel(req.body);
        const newProject = await project.save();
        return formatOutput(res, newProject, 201, 'project')
    } catch (e) {
        return res.status(400).send(e);
    }
}

// READ
export async function getProject(req: Request, res: Response, next: NextFunction) {
    const id = req.params.projectId;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }
    try {
        const project = await ProjectModel.findById(id).exec();
        if (!project) {
            return res.status(404).send();
        }
        return formatOutput(res, project, 200, 'project')
    } catch (e) {
        return res.status(400).send(e);
    }
}

// UPDATE
export async function updateProject(req: Request, res: Response, next: NextFunction) {
    const id = req.params.projectId;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }
    try {
        const project = await ProjectModel.findById(id).exec();
        if (!project) {
            return res.status(404).send();
        } else {
            project.title = req.body.title;
            project.subtitle = req.body.subtitle;
            project.description = req.body.description;
            project.type = req.body.type;
            project.tags = req.body.tags;
            project.images = req.body.images;
            await project.save();
            return formatOutput(res, project, 200, 'project')
        }
    } catch (e) {
        return res.status(400).send(e);
    }
}

// DELETE
export async function deleteProject(req: Request, res: Response, next: NextFunction) {
    const id = req.params.projectId;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }
    try {
        const project = await ProjectModel.findById(id).exec();
        if (!project) {
            return res.status(404).send();
        } else {
            const project2 = await ProjectModel.findByIdAndDelete(id).exec();
            return formatOutput(res, project2, 200, 'project')
        }
    } catch (e) {
        return res.status(400).send(e);
    }
}

export async function getProjectList(req: Request, res: Response, next: NextFunction) {
    const projects = await ProjectModel.find({}).exec();
    return res.status(200).send(projects);
}