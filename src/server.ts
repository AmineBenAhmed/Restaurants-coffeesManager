import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import Logging from './library/logging';
import { config } from './config'

const router = express();
/** connect mongoose **/
Logging.info('connecting to database...')
mongoose
  .connect(config.mongo.url, { 
    retryWrites: true, 
    w: 'majority',
    keepAlive: true,
  })
  .then(() => Logging.info('Database connected successfully!'))
  .catch((error) => {
      Logging.error('Connection failed to database!');
      Logging.error(error);
    }         
  );

const startServer = () => {
  if (config.env.NODE_ENV !== 'production') {  
    router.use((req: Request, res: Response, next: NextFunction) => {
      /** Log the request **/
      Logging.info(`Incoming -> METHOD: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - address`)
    
      res.on('finish', () => {
        Logging.info(`Incoming -> METHOD: [${req.method}] - Url: [${req.url}] - 
        IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
      });

      next();
    })
  }

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');//the '*' means allow connection from anywhere otherwise you can choose the allowed IPs list
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-METHOD', 'PUT, POST, DELETE, PATCH, Get');
      return res.status(200).json({});
    }
    next();
  });

  /** Routes **/

  /** HealthCheck **/
  router.get('/ping', (req, res, next) => res.status(200).send('pong'))

  /** Error Handling **/
  router.use((req, res, next) => {
    const error = new Error(`Path [${req.url}] Not Found`);
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}!`));
};

startServer();
