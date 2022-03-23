import multer from 'multer';
import { Router } from 'express';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@module/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@module/accounts/useCases/updateUserAvatar/updateUserAvatarController';
import { ProfileUserController } from '@module/accounts/useCases/profileUserUseCase/ProfileUserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
