// routes/cloud.route.ts
import { Router } from 'express';
import { addSessionIfExists, requireAuth } from '../middleware/auth.middleware';
import * as cloudController from '../controllers/cloud.controller';

const CloudRouter = Router();

CloudRouter.post('/', requireAuth, cloudController.createCloud);
CloudRouter.get('/', addSessionIfExists, cloudController.getFilteredClouds);
CloudRouter.get('/all', cloudController.getAllClouds);
CloudRouter.get('/:id', cloudController.getCloudById);
CloudRouter.get('/user/:id', cloudController.getCloudsByUserId);
CloudRouter.get('/guesses/:id', cloudController.getGuessesByCloudId);

export default CloudRouter;