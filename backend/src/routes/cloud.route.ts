// routes/cloud.route.ts
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import * as cloudController from '../controllers/cloud.controller';

const CloudRouter = Router();

CloudRouter.post('/', requireAuth, cloudController.createCloud);
CloudRouter.get('/', requireAuth, cloudController.getAllClouds);
CloudRouter.get('/:id', cloudController.getCloudById);

export default CloudRouter;