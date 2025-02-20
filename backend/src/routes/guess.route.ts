// routes/guess.routes.ts
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import * as guessController from '../controllers/guess.controller';

const GuessRouter = Router();

GuessRouter.get('/', requireAuth, guessController.getAllGuesses);
GuessRouter.post('/', requireAuth, guessController.createGuess);
GuessRouter.get('/:id', requireAuth, guessController.getGuessById);
GuessRouter.get('/cloud/:cloudId', requireAuth, guessController.getGuessesByCloudId);

export default GuessRouter;