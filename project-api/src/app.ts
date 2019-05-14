import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';

import * as swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../api/projectapi.json');

import { Index } from './routes/index';
import ProjectRoute from './routes/project';
import * as errorHandler from './utility/errorHandling';

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

        // Database
        this.mongoSetup();

        // Logging
        this.app.use(
          expressWinston.errorLogger({
            transports: [new winston.transports.Console()],
          })
        );
        // Error handling
        this.app.use(errorHandler.logging);
        this.app.use(errorHandler.errorHandler);
    }

    private mongoSetup(): void {
        mongoose.connect(
          this.mongoUrl,
          { useNewUrlParser: true }
        )
      }
}

export default new App().app;