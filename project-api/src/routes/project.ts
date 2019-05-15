import { Application } from 'express';
import * as projectController from '../controllers/project';
import * as passport from 'passport'
import { PassportConfiguration } from '../utility/passportConfiguration'

export default class ProjectRoute extends PassportConfiguration{
    public routes(app: Application) {
        app.route('/project').get(projectController.getProjectList);
        app.route('/project').post(passport.authenticate('jwt', { session: false }), projectController.addProject);
        app.route('/project/:projectId').get(projectController.getProject);
        app.route('/project/:projectId').patch(passport.authenticate('jwt', { session: false }), projectController.updateProject);
        app.route('/project/:projectId').delete(passport.authenticate('jwt', { session: false }), projectController.deleteProject);
    }
}