import { Application } from 'express';
import * as projectController from '../controllers/project';

export default class ProjectRoute {
    public routes(app: Application) {
        app.route('/project').get(projectController.getProjectList);
        app.route('/project').post(projectController.addProject);
        app.route('/project/:projectId').get(projectController.getProject);
        app.route('/project/:projectId').patch(projectController.updateProject);
        app.route('/project/:projectId').delete(projectController.deleteProject);
    }
}