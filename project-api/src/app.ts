import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';

import * as swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../api/projectapi.json');

import { Index } from './routes/index';
import ProjectRoute from './routes/project';

class App {
    public app: express.Application;
    public IndexRoutes: Index = new Index();
    private projectRoute: ProjectRoute = new ProjectRoute();
    public mongoUrl: string = 'mongodb://localhost/projects'

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());

        // Swagger-UI
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        // Routes
        this.IndexRoutes.routes(this.app);
        this.projectRoute.routes(this.app);

        this.mongoSetup();
    }

    private mongoSetup(): void {
        mongoose.connect(
          this.mongoUrl,
          { useNewUrlParser: true }
        )
      }
}

export default new App().app;