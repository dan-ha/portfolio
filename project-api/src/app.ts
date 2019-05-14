import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv'

import * as winston from 'winston';
import * as expressWinston from 'express-winston';

import * as swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../api/projectapi.json');

import ProjectRoute from './routes/project';
import * as errorHandler from './utility/errorHandling';

class App {
  public app: express.Application;
  private projectRoute: ProjectRoute = new ProjectRoute();
  public mongoUrl: string
  public mongoUser: string
  public mongoPass: string

  constructor() {
    const path = `${__dirname}/../.env.${process.env.NODE_ENV}`
    dotenv.config({ path: path })
    this.mongoUrl = `mongodb://${process.env.MONGODB_URL_PORT}/${
      process.env.MONGODB_DATABASE
    }`;
    this.mongoUser = `${process.env.MONGODB_USER}`
    this.mongoPass = `${process.env.MONGODB_PASS}`

    this.app = express();
    this.app.use(bodyParser.json());

    // Swagger-UI
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Routes
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
    let options

    if (process.env.NODE_ENV !== 'prod') {
      options = {
        useNewUrlParser: true,
      }
    } else {
      options = {
        user: this.mongoUser,
        pass: this.mongoPass,
        useNewUrlParser: true,
      }
    }
    mongoose.connect(
      this.mongoUrl,
      options
    )
  }
}

export default new App().app;


