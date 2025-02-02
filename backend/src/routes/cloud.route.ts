// routes/cloud.route.ts
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import * as cloudController from '../controllers/cloud.controller';

const CloudRouter = Router();

CloudRouter.post('/', requireAuth, cloudController.createCloud);

/**
 * @swagger
 * /api/clouds:
 *   get:
 *     summary: Get all clouds
 *     tags: [Clouds]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of clouds to return
 *     responses:
 *       200:
 *         description: List of clouds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cloud'
 *       401:
 *         description: Not authorized
 */
CloudRouter.get('/', cloudController.getAllClouds);

/**
 * @swagger
 * /api/clouds/{id}:
 *   get:
 *     summary: Get a cloud by ID
 *     tags: [Clouds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cloud ID
 *     responses:
 *       200:
 *         description: Cloud details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cloud'
 *       404:
 *         description: Cloud not found
 */
CloudRouter.get('/:id', cloudController.getCloudById);

export default CloudRouter;