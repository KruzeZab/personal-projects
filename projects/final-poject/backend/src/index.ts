import express from 'express';
import cors from 'cors';

import config from './config';

import routes from './routes';
import { logger } from './middleware/logger';
import { AppDataSource } from './database/data-source';
import { genericErrorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.use(cors());

app.use(logger);

app.use(routes);

app.use(genericErrorHandler);

const main = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(config.serverPort);
    console.log(`Server listening on port: ${config.serverPort}`);
  } catch (error) {
    throw new Error(error as string);
  }
};

main();
