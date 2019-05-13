import * as bodyParser from 'body-parser';
import * as express from 'express';

import * as swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../api/projectapi.json');

import { Index } from './routes/index';

class App {
    public app: express.Application;
    public IndexRoutes: Index = new Index();

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());

        // Swagger-UI
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        // Routes
        this.IndexRoutes.routes(this.app);
    }
}

export default new App().app;