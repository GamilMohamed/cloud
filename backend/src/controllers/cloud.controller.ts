// controllers/cloud.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../prisma';
import cloudinary from '../config/cloudinary.config';
export const createCloud = async (req: Request, res: Response) => {
  try {
    const { image, answer, filter } = req.body;

    // 1. D'abord, on upload les images à Cloudinary
    console.log('createCloud');
    const [cloudinaryImage, cloudinaryFilter] = await Promise.all([
      cloudinary.uploader.upload(image, {
        folder: 'clouds/pictures',
      }),
      cloudinary.uploader.upload(filter, {
        folder: 'clouds/filters',
      })
    ]);
    // data: {
    //   image: cloudinaryImage.secure_url, // On stocke l'URL Cloudinary
    //   filter: cloudinaryFilter.secure_url, // On stocke l'URL Cloudinary
    //   answer,
    //    //@ts-ignore
    //   userId: req.user.id,
    // },
    // 2. Ensuite, on sauvegarde les URLs dans notre base de données
    const cloud = await prisma.cloud.create({
    data: {
        image: cloudinaryImage.secure_url,
        answer,
        filter: cloudinaryFilter.secure_url,
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
    const clouds = await prisma.cloud.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(clouds);
  } catch (error) {
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