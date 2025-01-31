// routes/guess.routes.ts
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import * as guessController from '../controllers/guess.controller';

const GuessRouter = Router();

GuessRouter.get('/new', requireAuth, guessController.getANewGuess);
GuessRouter.get('/', requireAuth, guessController.getAllGuesses);
GuessRouter.post('/', requireAuth, guessController.createGuess);

export default GuessRouter;