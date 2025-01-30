// controllers/cloud.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const createCloud = async (req: Request, res: Response) => {
  try {
    const { image, answer } = req.body;
    const cloud = await prisma.cloud.create({
      data: {
        image,
        answer,
        userId: req.user.id,  // L'ID vient de auth.js via notre middleware
      },
    });
    res.json(cloud);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création' });
  }
};