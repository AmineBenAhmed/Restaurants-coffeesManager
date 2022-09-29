import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import { config } from './config'

const router = express();

/** connect mongoose **/
mongoose
  .connect(config.mongo.url, { 
    retryWrites: true, 
    w: 'majority',
    keepAlive: true,
  })
  .then(() => console.log('Database connected successfully!'))
  .catch((error) => {
     console.log(error);
  }         
  )


