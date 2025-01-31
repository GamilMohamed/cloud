// controllers/cloud.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../prisma';
import cloudinary from '../config/cloudinary.config';

export const getANewGuess = async (req: Request, res: Response) => {
  try {
    // prisma.guess.findFirsT()
   
    const cloud = await prisma.cloud.findFirst({
      where: {
        NOT: {
          guesses: {
            some: {
              // @ts-ignore
              userId: req.user?.id || ''
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Erreur lors de la recuperation d\'un guess' });
  }
};

export const getAllGuesses = async (req: Request, res: Response) => {
  try {
    const guesses = await prisma.guess.findMany();
    res.status(200).json(guesses);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Erreur lors de la recuperation des guesses' });
  }
};

export const createGuess = async (req: Request, res: Response) => {
  try {
    const { cloudId, answer, filter } = req.body;
    const cloudinaryFilter = await Promise.all([
      cloudinary.uploader.upload(filter, {
        folder: 'guess/filters',
      })
    ]);

    const guess = await prisma.guess.create({
      data: {
        answer,
        filter: cloudinaryFilter[0].secure_url,
        cloudId,
        // @ts-ignore
        userId: req.user?.id || ''
      }
    });

    const cloud = await prisma.cloud.findUnique({
      where: {
        id: cloudId
      }
    });
    res.status(201).json({ guess, cloud });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Erreur lors de la creation du guess' });
  }
}