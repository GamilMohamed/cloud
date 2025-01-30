// src/routes/cloud.route.ts
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import * as cloudController from '../controllers/cloud.controller';

const router = Router();

/**
 * @swagger
 * /api/clouds:
 *   post:
 *     summary: Create a new cloud drawing
 *     tags: [Clouds]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - answer
 *             properties:
 *               image:
 *                 type: string
 *                 description: Base64 encoded image
 *               answer:
 *                 type: string
 *                 description: What the user sees in the cloud
 *               filter:
 *                 type: string
 *                 description: Drawing filter applied
 *     responses:
 *       201:
 *         description: Cloud created successfully
 *       401:
 *         description: Not authorized
 *       400:
 *         description: Invalid input
 */
router.post('/', requireAuth, cloudController.createCloud);

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
 *       401:
 *         description: Not authorized
 */
router.get('/', requireAuth, cloudController.getAllClouds);

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
 *       404:
 *         description: Cloud not found
 */
router.get('/:id', cloudController.getCloudById);

export default router;