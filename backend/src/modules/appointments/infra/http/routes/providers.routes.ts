import { Router } from 'express';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAutheticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
