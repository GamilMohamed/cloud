// controllers/cloud.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../prisma';
import cloudinary from '../config/cloudinary.config';

export const createCloud = async (req: Request, res: Response) => {
  try {
    const { image, answer, filter, size } = req.body;

    // 1. D'abord, on upload les images à Cloudinary
    const [cloudinaryImage, cloudinaryFilter] = await Promise.all([
      cloudinary.uploader.upload(image, {
        folder: 'clouds/pictures',
      }),
      cloudinary.uploader.upload(filter, {
        folder: 'clouds/filters',
      })
    ]);
    // 2. Ensuite, on sauvegarde les URLs dans notre base de données
    const cloud = await prisma.cloud.create({
      data: {
        image: cloudinaryImage.secure_url,
        answer,
        filter: cloudinaryFilter.secure_url,
        aspect: size.width > size.height ? 'landscape' : size.width < size.height ? 'portrait' : 'square',
        //@ts-ignore
        userId: req.user?.id ?? '', // probleme de merde
      },
    });

    res.json(cloud);
    console.log('done !');
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Erreur lors de la création' });
  }
};

export const getAllClouds = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
    //@ts-ignore
    // console.log(req.user);
    const clouds = await prisma.cloud.findMany();
    const nbClouds = await prisma.cloud.count();

    res.setHeader('X-Total-Count', nbClouds.toString());
    res.setHeader('Cache-Control', 'public, max-age=100');
    res.json(clouds);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la récupération' });
  }
};

export const getFilteredClouds = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
    //@ts-ignore
    // console.log(req.user);
    const clouds = await prisma.cloud.findMany({
      where: {
        NOT: {
          //@ts-ignore
          userId: req.user?.id || '', // pas à moi
        },
        guesses: {
          none: {
            //@ts-ignore
            userId: req.user?.id || '', // pas déjà deviné
          }
        }
      },
      skip: skip,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        image: true,
        filter: true,
        createdAt: true,
        aspect: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    const nbClouds = clouds.length;

    res.setHeader('X-Total-Count', nbClouds.toString());
    res.setHeader('Cache-Control', 'public, max-age=100');
    res.json(clouds);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la récupération' });
  }
};

export const getCloudsByUserId = async (req: Request, res: Response) => {
  try {
    const clouds = await prisma.cloud.findMany({
      where: {
        // @ts-ignore
        userId: req.params.id,
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log(clouds);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la récupération' });
  }
};

export const getGuessesByCloudId = async (req: Request, res: Response) => {
  try {
    const guesses = await prisma.guess.findMany({
      where: {
        cloudId: req.params.id,
      },
    });
    res.json(guesses);
  }
  catch (error) {
    res.status(400).json({ error: 'Erreur lors de la récupération' });
  }
};

export const getCloudById = async (req: Request, res: Response) => {
  try {
    console.log('getCloudById');
    console.log(req.params.id);
    const cloud = await prisma.cloud.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json(cloud);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la récupération' });
  }
};