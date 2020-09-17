import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controller/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserAvatarController from '../controller/UserAvatarController';

const usersRouter = Router();
const userAvatarController = new UserAvatarController();

const usersController = new UsersController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
